import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout';
import { Elements } from '@stripe/react-stripe-js';
const PUBLIC_KEY =
  'pk_test_51PKHte2Lq7GtJqOxtvyPO7ukvkcnjSWGlWDW6KypFgy9BKtizq8vJWBtMDnuyRuBAVpasmuPuvgoOeKPNTSRgwWj00CmnXQtaQ';
const Payment = (props) => {
  const stripePromise = loadStripe(PUBLIC_KEY);

  return (
    <section>
      <h2>Payment</h2>
      <p style={{ color: '#05074e' }}>Commande : {props.params.orderId}</p>
      <Elements stripe={stripePromise}>
        {/* se connecter avec stripe pour effectuer le paiement*/}
        <CheckoutForm orderId={props.params.orderId} />
      </Elements>
    </section>
  );
};

export default Payment;
