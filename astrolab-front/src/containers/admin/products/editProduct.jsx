import axios from 'axios';
import { config } from '../../../../config';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import { Link } from 'react-router-dom';
import { IoPlayBackOutline } from 'react-icons/io5';
import {
  getOneProduct,
  displayAllProducts,
  updateProduct,
} from '../../../api/product';
import { uploadProducts } from '../../../slices/productSlice';

const EditProduct = (props) => {
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
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoAlt, setPhotoAlt] = useState('');
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');

  const modifyProduct = (data) => {
    updateProduct(data, props.params.id)
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.msg);
          displayAllProducts()
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
  const modifiedProduct = () => {
    if (imgFile === null) {
      // modifier sans changer la photo
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
        photo: photo,
        photoName: photoName,
        photoAlt: photoAlt,
      };
      modifyProduct(data);
    } else {
      // modifier avec changement de l'image
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
              photo: res.data.url,
              photoName: photoName,
              photoAlt: photoAlt,
            };
            modifyProduct(data);
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
      modifiedProduct();
    }
  };
  useEffect(() => {
    getOneProduct(props.params.id)
      .then((res) => {
        setProductName(res.result.productName);
        setBrand(res.result.brand);
        setGender(res.result.gender);
        setMouvement(res.result.mouvement);
        setDescription(res.result.description);
        setStockQuantity(res.result.stockQuantity);
        setPrice(res.result.price);
        setHistory(res.result.history);
        setFavorite(res.result.favorite);
        setPhoto(res.result.photo);
        setPhotoName(res.result.photoName);
        setPhotoAlt(res.result.photoAlt);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <h2>Modifier le produit</h2>
      {error !== null && <p>{error}</p>}
      {msg !== '' && <p style={{ color: 'red' }}>{msg}</p>}
      <div className="retour">
        <IoPlayBackOutline className="Admin__icon" />
        <Link to={'/admin/action'} className="Admin__links">
          Retour
        </Link>
      </div>
      <form className="Admin__add" onSubmit={handleSubmit}>
        <input
          type="text"
          value={productName}
          placeholder="Nom du produit"
          onChange={(e) => {
            setProductName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={brand}
          placeholder="Marque"
          onChange={(e) => {
            setBrand(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={gender}
          placeholder="Genre"
          onChange={(e) => {
            setGender(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={mouvement}
          placeholder="Mouvement"
          onChange={(e) => {
            setMouvement(e.currentTarget.value);
          }}
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        ></textarea>
        <input
          type="text"
          value={stockQuantity}
          placeholder="Quantité"
          onChange={(e) => {
            setStockQuantity(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={price}
          placeholder="Prix"
          onChange={(e) => {
            setPrice(e.currentTarget.value);
          }}
        />
        <textarea
          type="text"
          value={history}
          placeholder="Histoire"
          onChange={(e) => {
            setHistory(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={favorite}
          placeholder="Favorite"
          onChange={(e) => {
            setFavorite(e.currentTarget.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            setImgFile(e.currentTarget.files[0]);
          }}
        />
        <input
          type="text"
          value={photoName}
          placeholder="Nom du Photo"
          onChange={(e) => {
            setPhotoName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          value={photoAlt}
          placeholder="Photo Alt"
          onChange={(e) => {
            setPhotoAlt(e.currentTarget.value);
          }}
        />
        <button onClick={() => handleSubmit()}>Enregistrer</button>
      </form>
    </section>
  );
};
export default EditProduct;
