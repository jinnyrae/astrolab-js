import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { getAllOrders } from '../../../api/order';
import moment from 'moment';
import { IoPlayBackOutline } from 'react-icons/io5';
const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.result);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <h2> Les Commandes</h2>
      <div className="retour">
        <IoPlayBackOutline className="Admin__icon" />
        <Link to={'/admin'} className="Admin__links">
          Retour
        </Link>
      </div>
      <div>
        <h3>En attente de paiement</h3>
        <table className="Admin__table">
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Prix Total</th>
              <th>Date de Commande</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => {
                if (item.status === 'unpaid') {
                  return (
                    <tr className="Admin__table-tr" key={item.id}>
                      <td>
                        <Link to={`/admin/orderDetails/${item.id}`}>
                          {item.id}
                        </Link>
                      </td>
                      <td>{item.totalSum} Euros</td>
                      <td>
                        {moment(item.createTimeStamp).format('DD-MM-YYYY')}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="Admin">
        <h3>Payés</h3>
        <table className="Admin__table">
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Prix Total</th>
              <th>Date de Commande</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => {
                if (item.status === 'payed') {
                  return (
                    <tr className="Admin__table-tr" key={item.id}>
                      <td>
                        <Link to={`/admin/orderDetails/${item.id}`}>
                          {item.id}
                        </Link>
                      </td>
                      <td>{item.totalSum} Euros</td>
                      <td>
                        {moment(item.createTimeStamp).format('DD-MM-YYYY')}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="Admin">
        <h3>Envoyées</h3>
        <table className="Admin__table">
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Prix Total</th>
              <th>Date de Commande</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => {
                if (item.status === 'shipped') {
                  return (
                    <tr className="Admin__table-tr" key={item.id}>
                      <td>
                        <Link to={`/admin/orderDetails/${item.id}`}>
                          {item.id}
                        </Link>
                      </td>
                      <td>{item.totalSum} Euros</td>
                      <td>
                        {moment(item.createTimeStamp).format('DD-MM-YYYY')}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="Admin">
        <h3>Terminées</h3>
        <table className="Admin__table">
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Prix Total</th>
              <th>Date de Commande</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => {
                if (item.status === 'finished') {
                  return (
                    <tr className="Admin__table-tr" key={item.id}>
                      <td>
                        <Link to={`/admin/orderDetails/${item.id}`}>
                          {item.id}
                        </Link>
                      </td>
                      <td>{item.totalSum} Euros</td>
                      <td>
                        {' '}
                        {moment(item.createTimeStamp).format('DD-MM-YYYY')}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default OrdersTable;
