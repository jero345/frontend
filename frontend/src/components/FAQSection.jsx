import React, { useState } from 'react'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "¿Cómo va a funcionar el ingreso y el parqueadero?",
      answer: "Por orden de llegada. Tenemos parqueaderos limitados y sin costo adicional. Te recomendamos llegar temprano para asegurar tu lugar."
    },
    {
      question: "¿Qué incluye el kit del corredor?",
      answer: "El kit incluye: camiseta técnica oficial del evento, número de corredor personalizado, chip de cronometraje profesional y medalla finisher al completar la carrera."
    },
    {
      question: "¿Dónde y cuándo reclamo mi kit?",
      answer: "La información sobre la entrega de kits será comunicada próximamente. Deberás presentar tu documento de identidad para reclamarlo. Si no puedes asistir, puedes autorizar a otra persona con una carta de autorización y avisando mínimo 48 horas antes, como indica nuestra política de términos y condiciones. El mismo día del evento NO se entregarán kits, es obligatorio recogerlo en la fecha indicada."
    },
    {
      question: "¿Puedo hacer la carrera caminando?",
      answer: "¡Claro! Queremos que la disfrutes y te sientas cómodo. Se puede hacer caminando, trotando o corriendo. Lo importante es participar y disfrutar."
    },
    {
      question: "¿Debo escoger qué distancia quiero correr?",
      answer: "No, esto lo puedes decidir el mismo día del evento según como te sientas. Puedes hacer cualquiera de las dos distancias (3K o 6K) sin restricción."
    },
    {
      question: "¿Hay un límite de tiempo para terminar la carrera?",
      answer: "No te afanes, tienes hasta que finalice el evento para terminarla. El tiempo es suficiente para completar cualquiera de las distancias a tu propio ritmo."
    },
    {
      question: "¿Cuántos acompañantes puedo llevar?",
      answer: "Puedes venir con tu familia y amigos. Los acompañantes que no participen en la carrera pueden ingresar al campus para apoyarte y disfrutar del ambiente del evento."
    },
    {
      question: "¿Puedo venir con un familiar o amigo de otro colegio?",
      answer: "¡Claro, son bienvenidos! Siempre y cuando tú seas el responsable y la compra la realices directamente a tu nombre."
    },
    {
      question: "¿Qué pasa si no termino la carrera?",
      answer: "No te preocupes, todos vamos a nuestro propio ritmo. Puedes salirte en cualquier momento del recorrido si lo necesitas. Lo importante es que lo intentes y te diviertas."
    },
    {
      question: "¿Tendrán puntos de hidratación?",
      answer: "¡La seguridad es lo más importante para nosotros! Tendremos a lo largo del recorrido zonas de hidratación ubicadas estratégicamente. No te preocupes por traer agua."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#02afd7' }}></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#f5522a' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-white font-black text-sm uppercase tracking-wider px-6 py-2 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}>
            Resolvemos tus dudas
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Preguntas <span style={{ color: '#f5522a' }}>Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber sobre TCS RUN Rock & Roll 2026
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-[#f5522a] shadow-xl' : 'border-gray-100 hover:border-gray-200'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
              >
                <span className={`font-bold text-lg pr-4 ${openIndex === index ? 'text-[#f5522a]' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                  style={{ backgroundColor: openIndex === index ? '#f5522a' : '#f3f4f6' }}
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${openIndex === index ? 'text-white' : 'text-gray-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-gray-100 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-6 md:p-8 rounded-3xl" style={{ background: 'linear-gradient(135deg, #02afd7 0%, #0891b2 100%)' }}>
          <h3 className="text-2xl font-black text-white mb-3">
            ¿Tienes otra pregunta?
          </h3>
          <p className="text-white/90 mb-6">
            Escríbenos y te responderemos lo antes posible
          </p>
          <a
            href="mailto:tcsrun@columbus.edu.co"
            className="inline-flex max-w-full items-center justify-center gap-2 md:gap-3 bg-white text-gray-900 px-4 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" style={{ color: '#f5522a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="break-all">tcsrun@columbus.edu.co</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
