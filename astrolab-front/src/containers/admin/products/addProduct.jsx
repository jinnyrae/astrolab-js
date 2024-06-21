import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import { uploadProducts } from '../../../slices/productSlice';
import { Link, Navigate } from 'react-router-dom';
import { insertProduct, displayAllProducts } from '../../../api/product';
import axios from 'axios';
import { config } from '../../../../config';
import { IoPlayBackOutline } from 'react-icons/io5';
export const AddProduct = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [gender, setGender] = useState('');
  const [mouvement, setMouvement] = useState('');
  const [description, setDescription] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [history, setHistory] = useState('');
  const [favorite, setFavorite] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoAlt, setPhotoAlt] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const addOneProduct = (data) => {
    insertProduct(data)
      .then((res) => {
        if (res.status === 200) {
          // produit ajouté
          displayAllProducts()
            .then((responce) => {
              if (responce.status === 200) {
                // mettre à jour le store
                dispatch(uploadProducts(responce.result));
                setRedirect(true);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  const saveProduct = () => {
    if (imgFile === null) {
      // produit sans photo
      const data = {
        productName: productName,
        brand: brand,
        gender: gender,
        mouvement: mouvement,
        description: description,
        stockQuantity: stockQuantity,
        price: price,
        history: history,
        favorite: favorite,
      };
      addOneProduct(data);
    } else {
      // Ajouter l'image
      const formData = new FormData();
      formData.append('image', imgFile);
      axios({
        method: 'post',
        url: `${config.api_url}/api/v1/Products/image`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': user.userInfo.token,
        },
      })
        .then((res) => {
          if (res.data.status === 200) {
            const data = {
              productName: productName,
              brand: brand,
              gender: gender,
              mouvement: mouvement,
              description: description,
              stockQuantity: stockQuantity,
              price: price,
              history: history,
              favorite: favorite,
              phtoName: photoName,
              photoAlt: photoAlt,
              photo: res.data.url,
            };
            addOneProduct(data);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (isNaN(stockQuantity) || isNaN(price) || isNaN(favorite)) {
      setError('Les champs prix et quantité doivent être des chiffres!');
    } else {
      saveProduct();
    }
  };
  if (redirect) {
    return <Navigate to="/admin" />;
  }
  return (
    <section>
      <h2>Ajouter un produit</h2>
      <div className="retour">
        <IoPlayBackOutline className="Admin__icon" />
        <Link to={'/admin'} className="Admin__links">
          Retour
        </Link>
      </div>

      {error !== null && <p>{error}</p>}
      <form className="Admin__add" onSubmit={handleSubmit}>
        <input
          name="productName"
          type="text"
          placeholder="Nom du produit"
          onChange={(e) => {
            setProductName(e.currentTarget.value);
          }}
        />
        <input
          name="brand"
          type="text"
          placeholder="Marque"
          onChange={(e) => {
            setBrand(e.currentTarget.value);
          }}
        />
        <input
          name="gender"
          type="text"
          placeholder="Genre"
          onChange={(e) => {
            setGender(e.currentTarget.value);
          }}
        />
        <input
          name="mouvement"
          type="text"
          placeholder="Mouvement"
          onChange={(e) => {
            setMouvement(e.currentTarget.value);
          }}
        />

        <input
          name="stockQuantity"
          type="text"
          placeholder="Quantité"
          onChange={(e) => {
            setStockQuantity(e.currentTarget.value);
          }}
        />
        <input
          name="price"
          type="text"
          placeholder="Prix"
          onChange={(e) => {
            setPrice(e.currentTarget.value);
          }}
        />
        <input
          name="favorite"
          type="text"
          placeholder="Favorite"
          onChange={(e) => {
            setFavorite(e.currentTarget.value);
          }}
        />
        <textarea
          name="history"
          placeholder="Histoire"
          onChange={(e) => {
            setHistory(e.currentTarget.value);
          }}
        ></textarea>
        <textarea
          name="description"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        ></textarea>

        <input
          type="file"
          onChange={(e) => {
            setImgFile(e.currentTarget.files[0]);
          }}
        />
        <input
          type="text"
          placeholder="Nom du Photo"
          onChange={(e) => {
            setPhotoName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Photo Alt"
          onChange={(e) => {
            setPhotoAlt(e.currentTarget.value);
          }}
        />
        <button>Enregistrer</button>
      </form>
    </section>
  );
};

export default AddProduct;
