import logoSafetti from '../assets/images/partners/partner_1.png'
import logoCoordinadora from '../assets/images/partners/partner_2.png'
import logoAutoamerica from '../assets/images/partners/partner_3.png'
import logoPC12ARWS from '../assets/images/partners/partner_4.png'
import logoDgroup from '../assets/images/partners/partner_5.png'
import logoConexion from '../assets/images/partners/partner_6.png'
import logoUPB from '../assets/images/partners/partner_7.png'

const PartnersSection = () => {
  const partners = [
    {
      name: 'Safetti',
      logo: logoSafetti,
      description: 'Hidratación oficial'
    },
    {
      name: 'Coordinadora',
      logo: logoCoordinadora,
      description: 'Logística y transporte'
    },
    {
      name: 'Autoamerica',
      logo: logoAutoamerica,
      description: 'Sponsor oficial'
    },
    {
      name: 'PC12 y ARWS',
      logo: logoPC12ARWS,
      description: 'Partner oficial'
    },
    {
      name: 'Dgroup',
      logo: logoDgroup,
      description: 'Partner oficial'
    },
    {
      name: 'Conexión',
      logo: logoConexion,
      description: 'Partner oficial'
    },
    {
      name: 'UPB',
      logo: logoUPB,
      description: 'Partner oficial'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ backgroundColor: '#02afd7' }}></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ backgroundColor: '#f5522a' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-white font-bold text-sm uppercase tracking-wider px-6 py-2 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #02afd7 0%, #f5522a 100%)' }}>
            Nuestros Aliados
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Partners <span style={{ color: '#f5522a' }}>Oficiales</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Gracias a nuestros patrocinadores por hacer posible este evento
          </p>
        </div>

        {/* Grid de Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-28 flex items-center justify-center mb-6">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
