import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadProducts } from '../../../slices/productSlice';
import { Link } from 'react-router-dom';
import { config } from '../../../../config';
import { deleteProduct, displayAllProducts } from '../../../api/product';
import { IoPlayBackOutline } from 'react-icons/io5';

const Action = () => {
  const dispatch = useDispatch();
  const [montre, setMontre] = useState([]);
  const [msg, setMsg] = useState('');

  const handleDeleteProduct = (id) => {
    setMsg('');
    deleteProduct(id)
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.msg);
          displayAllProducts(res.result)
            .then((responce) => {
              if (responce.status === 200) {
                dispatch(uploadProducts(responce.result));
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    displayAllProducts()
      .then((res) => {
        if (res.status === 200) {
          setMontre(res.result);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section>
      <div className="Admin">
        <h2>Les produits</h2>
        <div className="retour">
          <IoPlayBackOutline className="Admin__icon" />
          <Link to={'/admin'} className="Admin__links">
            Retour
          </Link>
        </div>
        {msg !== '' && (
          <p style={{ color: 'red', paddingBottom: '2rem' }}>{msg}</p>
        )}
        <table className="Admin__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom du produit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {montre.length > 0 ? (
              montre.map((item) => {
                const image = item.photo ? item.photo : 'no-pict.jpg';
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        className="Admin__table-img"
                        src={config.img_url + image}
                      />
                    </td>
                    <td>{item.productName}</td>

                    <td>
                      <Link
                        className="action"
                        to={`/admin/editProduct/${item.id}`}
                      >
                        Modifier
                      </Link>
                      <button
                        className="action-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteProduct(item.id);
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default Action;
