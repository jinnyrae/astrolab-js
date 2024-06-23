import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { checkPayment, updatePaymentStatus } from '../api/order';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';

const CheckOut = (props) => {
  const [error, setError] = useState(false);
  const [successRedirect, setSuccessRedirect] = useState(false);
  const user = useSelector(selectUser);
  const stripe = useStripe();
  const elements = useElements(); // utilisation de la carte
  const handlSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError('Error de terminal de paiement!');
      return;
    }
    const data = {
      email: user.userInfo.email,
      orderId: props.orderId,
    };

    const paymentAuth = await checkPayment(data); // verification du status de paiement

    if (paymentAuth.status === 500) {
      setError('Echec de paiment');
    }
    const secret = paymentAuth.client_secret; // si paiment, stripe retourne une clé

    const payment = await stripe.confirmCardPayment(secret, {
      // paiement
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.userInfo.email,
        },
      },
    });
    if (payment.error) {
      setError(payment.error.message);
    } else {
      if (payment.paymentIntent.status === 'succeeded') {
        // paiement réussi
        let data = {
          id: props.orderId,
          status: 'payed',
        };

        updatePaymentStatus(data)
          .then((res) => {
            if (res.status === 200) {
              setSuccessRedirect(true);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };
  if (successRedirect) {
    return <Navigate to={'/success'} />;
  }
  return (
    <section>
      {error !== null && <p>{error}</p>}
      <form onSubmit={handlSubmit}>
        <CardElement
          options={{
            // vient de stripe
            style: {
              base: {
                color: '#05074e',
                fontFamily: 'Roberto',
                fontSize: '1rem',
                '::placeholder': {
                  color: '#730814',
                },
              },
              invalid: {
                color: 'red',
                iconColor: '#730814',
              },
            },
          }}
        />
        <button className="Stripe__btn" disabled={props.stripe}>
          Payer
        </button>
      </form>
    </section>
  );
};
export default CheckOut;
