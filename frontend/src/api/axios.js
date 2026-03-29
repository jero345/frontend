import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    // Agregar token si existe
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Agregar SUPPORT_KEY para rutas protegidas
    // Solo se agrega en métodos que modifican datos
    const protectedMethods = ['post', 'put', 'delete']
    if (protectedMethods.includes(config.method.toLowerCase())) {
      // Excepción: no agregar en el webhook de Wompi
      if (!config.url.includes('/webhooks/wompi')) {
        config.headers['X-SUPPORT-KEY'] = import.meta.env.VITE_SUPPORT_KEY
      }
    }

    // También agregar en GET /api/persons/by-document
    if (config.url.includes('/api/persons/by-document')) {
      config.headers['X-SUPPORT-KEY'] = import.meta.env.VITE_SUPPORT_KEY
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Si es error de autenticación, mostrar mensaje
        console.error('Acceso no autorizado.')

        // Opcional: limpiar storage y redirigir
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } else if (error.request) {
      console.error('Error de red:', error.message)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api