import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  updatePaymentStatus,
  getDetailedOrder,
  getOneOrder,
} from '../../../api/order';
import moment from 'moment';
import { IoPlayBackOutline } from 'react-icons/io5';

export const OrderDetails = ({ params }) => {
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [user, setUser] = useState(null);

  const findOrder = () => {
    getOneOrder(params.id)
      .then((res) => {
        if (res.status === 200) {
          getDetailedOrder(res.result[0].id)
            .then((responce) => {
              if (responce.status === 200) {
                setOrder(res.result[0]);
                setOrderDetails(responce.detailedOrder);
                setUser(responce.user);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  const statusHandler = (newStatus) => {
    updatePaymentStatus({ id: params.id, status: newStatus })
      .then((res) => {
        if (res.status === 200) {
          console.log('status', res);
          findOrder();
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    findOrder();
  }, []);

  return (
    <section>
      <h2>Commande {params.id}</h2>
      <div className="retour">
        <IoPlayBackOutline className="Admin__icon" />
        <Link to={'/admin/orderTable'} className="Admin__links">
          Retour
        </Link>
      </div>
      {user !== null && (
        <article>
          <div className="Order__client">
            <h3>
              Client: {user.firstName} {user.lastName}
            </h3>
            <p className="Order__p">Email: {user.email}</p>
            <p className="Order__p">{user.addressLine1}</p>
            <p className="Order__p">
              Adresse: {user.city}, {user.country}
            </p>
          </div>
        </article>
      )}
      <div>
        <h3>Details de la Commande</h3>
        <table className="Admin__table details">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité </th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {order !== null && (
            <tbody>
              {orderDetails.length > 0 &&
                orderDetails.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.total}</td>
                      <td>
                        {moment(order.createTimeStamp).format('DD-MM-YYYY')}
                      </td>
                      <td>{order.status}</td>
                      <td className="handlerBtn">
                        <button onClick={() => statusHandler('shipped')}>
                          Envoyée
                        </button>
                        <button onClick={() => statusHandler('finished')}>
                          Terminée
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </div>
    </section>
  );
};
export default OrderDetails;
