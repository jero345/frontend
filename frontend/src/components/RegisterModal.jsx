import React, { useState } from 'react'
import authService from '../api/authService'

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const initialState = {
    nit_type: 'CC',
    nit: '',
    first_name: '',
    middle_name: '',
    last_name_1: '',
    last_name_2: '',
    birth_date: '',
    email: '',
    cell_phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  }

  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.nit) newErrors.nit = 'Documento requerido'
    if (!formData.first_name) newErrors.first_name = 'Nombre requerido'
    if (!formData.last_name_1) newErrors.last_name_1 = 'Apellido requerido'
    if (!formData.birth_date) newErrors.birth_date = 'Fecha requerida'
    if (!formData.email) newErrors.email = 'Correo requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo inválido'
    if (!formData.cell_phone) newErrors.cell_phone = 'Celular requerido'
    if (!formData.password) newErrors.password = 'Contraseña requerida'
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'No coinciden'
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setApiError('')

    try {
      await authService.register(formData)
      setSuccessMessage('¡Registro exitoso!')
      setTimeout(() => {
        handleClose()
        onSwitchToLogin()
      }, 2000)
    } catch (error) {
      setApiError(error.message || 'Error al registrar')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData(initialState)
    setErrors({})
    setApiError('')
    setSuccessMessage('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-6 text-center z-10">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
          <p className="text-white/80 mt-1">Únete a la comunidad</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Documento */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
              <select name="nit_type" value={formData.nit_type} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="TI">TI</option>
                <option value="PP">Pasaporte</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Número *</label>
              <input type="text" name="nit" value={formData.nit} onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.nit ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="1234567890" />
              {errors.nit && <p className="text-red-500 text-xs mt-1">{errors.nit}</p>}
            </div>
          </div>

          {/* Nombres */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primer Nombre *</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Juan" />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segundo Nombre</label>
              <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Carlos" />
            </div>
          </div>

          {/* Apellidos */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido *</label>
              <input type="text" name="last_name_1" value={formData.last_name_1} onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.last_name_1 ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Pérez" />
              {errors.last_name_1 && <p className="text-red-500 text-xs mt-1">{errors.last_name_1}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
              <input type="text" name="last_name_2" value={formData.last_name_2} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="García" />
            </div>
          </div>

          {/* Fecha nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento *</label>
            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.birth_date ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>}
          </div>

          {/* Email y Celular */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="correo@ejemplo.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Celular *</label>
              <input type="tel" name="cell_phone" value={formData.cell_phone} onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.cell_phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="3001234567" />
              {errors.cell_phone && <p className="text-red-500 text-xs mt-1">{errors.cell_phone}</p>}
            </div>
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Mín. 8 caracteres" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar *</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Repetir contraseña" />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Términos */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange}
                className="mt-1 w-4 h-4 text-orange-500 rounded" />
              <span className="text-sm text-gray-600">
                Acepto los <a href="#" className="text-orange-500">términos</a> y <a href="#" className="text-orange-500">política de privacidad</a>
              </span>
            </label>
            {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registrando...
              </>
            ) : 'Crear Cuenta'}
          </button>

          <p className="text-center text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button type="button" onClick={onSwitchToLogin} className="text-orange-500 font-semibold">
              Inicia sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal