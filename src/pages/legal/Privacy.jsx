import LegalPage from './LegalPage.jsx';

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="March 20, 2026">
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us when you make a purchase or use our services. This includes your name, email address, shipping address, birth date, birth time, and birth place. We also collect standard technical data such as IP address and browser type through our website analytics.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to process and fulfill your order, generate your personalized portal analysis, send order confirmations and shipping updates, respond to your support requests, and improve our products and services.</p>

      <h2>3. Birth Data</h2>
      <p>Your birth data (date, time, and place) is used exclusively to generate your personalized analysis within the Crystal Code portal. This data is treated with the highest level of confidentiality. We do not share, sell, or use your birth data for any purpose other than generating your personal analysis.</p>

      <h2>4. Payment Information</h2>
      <p>All payments are processed securely by Stripe. We do not store your credit card or payment details on our servers. Stripe's handling of your payment information is governed by their own privacy policy, available at stripe.com/privacy.</p>

      <h2>5. Data Sharing</h2>
      <p>We do not sell your personal data to third parties. We may share limited data with trusted service providers — such as shipping carriers and email service providers — only as strictly necessary to fulfill your order and deliver our services. These providers are bound by confidentiality agreements.</p>

      <h2>6. Data Retention and Your Rights</h2>
      <p>We retain your personal data for as long as necessary to provide our services and comply with legal obligations. You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at support@abundancecode.com. We will respond within 30 days.</p>

      <h2>7. Contact</h2>
      <p>For any privacy-related questions or requests, please contact us at: <strong>support@abundancecode.com</strong></p>
    </LegalPage>
  );
}
