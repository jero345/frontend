import React, { useState } from 'react'

const RegistrationForm = () => {
  const [step, setStep] = useState(1)
  const [selectedDistance, setSelectedDistance] = useState(null)

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 -mx-8 -mt-8 rounded-t-3xl mb-6">
          <h2 className="text-2xl font-bold">ENDURANCE RUN</h2>
        </div>
      </div>

      {/* Step 1: Atleta */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Paso 1: Atleta</h3>
        
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Nombre</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Fecha de Nacimiento</label>
          <input 
            type="date" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Distance Selection */}
        <div className="flex justify-center space-x-4 mb-6">
          {['5K', '10K', '21K'].map((distance) => (
            <button
              key={distance}
              onClick={() => setSelectedDistance(distance)}
              className={`w-20 h-20 rounded-full font-bold text-lg transition-all duration-300 ${
                selectedDistance === distance
                  ? 'bg-blue-500 text-white scale-110 shadow-lg'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {distance}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Salud */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Paso 3: Salud</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-2">Contacto Emergencia</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Número de contacto"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Tipo de Sangre</label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Selecciona tu tipo</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Alergias</label>
            <textarea 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Describe tus alergias (si aplica)"
            />
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="bg-gradient-to-br from-blue-400 to-orange-400 rounded-2xl p-6 mb-6">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
            <div className="text-gray-400 text-xs">QR Code</div>
          </div>
          <p className="text-sm text-gray-600">Escanea para pagar</p>
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
        Añézate a APPLE/GOOGLE WALLET
      </button>

      {/* Continue Button */}
      <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-full transition">
        Continuar al Pago
      </button>
    </div>
  )
}

export default RegistrationForm
