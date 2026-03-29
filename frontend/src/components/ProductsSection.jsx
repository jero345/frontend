import React from 'react'
import ProductCard from './ProductCard'

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Camiseta Técnica',
      price: 30,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      badge: '10K'
    },
    {
      id: 2,
      name: 'Camiseta Clásica',
      price: 30,
      imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
      badge: 'Endurance'
    },
    {
      id: 3,
      name: 'Gorra Running',
      price: 25,
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
      badge: '21K'
    },
    {
      id: 4,
      name: 'Gorra Premium',
      price: 28,
      imageUrl: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400',
      badge: null
    },
    {
      id: 5,
      name: 'Shorts Running Pro',
      price: 45,
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
      badge: 'Nuevo'
    },
    {
      id: 6,
      name: 'Zapatillas Running',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      badge: 'Popular'
    },
    {
      id: 7,
      name: 'Botella Hidratación',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      badge: null
    },
    {
      id: 8,
      name: 'Medias Compresión',
      price: 18,
      imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400',
      badge: 'Oferta'
    }
  ]

  return (
    <section id="productos" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: '#f5522a' }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-5" style={{ backgroundColor: '#02afd7' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-full text-white" style={{ backgroundColor: '#02afd7' }}>
            Tienda Oficial
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-6 mb-4">
            EQUÍPATE PARA LA <span style={{ color: '#f5522a' }}>META</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Encuentra todo lo que necesitas para tu próxima carrera. Productos de alta calidad
            seleccionados por corredores profesionales.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              badge={product.badge}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            className="inline-flex items-center gap-3 bg-white border-2 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ borderColor: '#f5522a', color: '#f5522a' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#f5522a'; e.target.style.color = 'white' }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#f5522a' }}
          >
            Ver Todo el Catálogo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection