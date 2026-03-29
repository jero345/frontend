import { useEffect } from 'react'

function WompiPaymentButton({ payment, buyer }) {
  useEffect(() => {
    if (!payment) return

    const container = document.getElementById('wompi-button-container')
    if (!container) return

    // Limpia si ya existe
    container.innerHTML = ''

    const form = document.createElement('form')

    const script = document.createElement('script')
    script.src = 'https://checkout.wompi.co/widget.js'
    script.setAttribute('data-render', 'button')
    script.setAttribute('data-public-key', payment.public_key)
    script.setAttribute('data-currency', payment.currency)
    script.setAttribute('data-amount-in-cents', payment.amount)
    script.setAttribute('data-reference', payment.reference)
    script.setAttribute('data-signature:integrity', payment.integrity_signature)

    if (payment.redirect_url) {
      script.setAttribute('data-redirect-url', payment.redirect_url)
    }

    if (buyer?.email) {
      script.setAttribute('data-customer-data:email', buyer.email)
    }

    if (buyer?.first_name) {
      script.setAttribute(
        'data-customer-data:full-name',
        `${buyer.first_name} ${buyer.last_name_1 || ''}`
      )
    }

    if (buyer?.cell_phone) {
      script.setAttribute('data-customer-data:phone-number', buyer.cell_phone)
      script.setAttribute('data-customer-data:phone-number-prefix', '+57')
    }

    form.appendChild(script)
    container.appendChild(form)
  }, [payment, buyer])

  return <div id="wompi-button-container" className="flex justify-center"></div>
}

export default WompiPaymentButton
