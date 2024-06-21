import InfinitText from '../components/infinitText';
import SimpleSlider from '../components/carousel';
import { config } from '../../config';
import Video from '/Users/jinny/Documents/astrolab-js/astrolab-front/public/images/Manufacture-horloge-Complications-online-video-cutter.com-1.mp4';
import image1 from '../../public/images//Warranty-300x300.png';
import image2 from '../../public/images/free-300x300.png';
import image3 from '../../public/images/refund-300x300.png';
import image4 from '../../public/images/free-300x300.png';
import { favoriteProducts } from '../api/product';
import { useEffect, useState } from 'react';
import Favorite from '../components/favorite';
const Home = () => {
  const [favorite, setFavorite] = useState([]);
  const getFavorites = (favo) => {
    const data = { favorite: favo };
    console.log('Request Data:', data);
    favoriteProducts(data)
      .then((res) => {
        console.log('Full Response:', res);
        if (res.status === 200) {
          console.log('Data:', res.result);
          setFavorite(res.result);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getFavorites('1');
  }, []);

  return (
    <section>
      <InfinitText />
      <h2>Nos Top Ventes</h2>
      <SimpleSlider />
      <div className="Video">
        <video autoPlay muted loop className="Video__film" src={Video}></video>
        <div className="Video__content">
          <h3>Les Ateliers d'Horlogerie</h3>
          <a href="/atelier">
            <button>Découvrez</button>
          </a>
          <p>
            Gagnez des place gratuites pour participez à l'un de nos ateliers
            d’horlogerie!
          </p>
        </div>
      </div>
      <h2>Nos Coup de Cœur</h2>
      {favorite.length > 0 && (
        <ul>
          {favorite.map((item) => {
            return <Favorite key={item.id} product={item} />;
          })}
        </ul>
      )}

      {/* <div className="Home__gallery">
        {favorite.length > 0 ? (
          favorite.map((item, index) => (
            <ul key={index}>
              <li>
                <img
                  className="Home__gallery-photo"
                  src={config.img_url + item.photo}
                />
              </li>
              <li className="Home__gallery-name">{item.productName}</li>
              <li className="Home__gallery-price">{item.price} € TTC</li>
            </ul>
          ))
        ) : (
          <p>No favorite products found.</p>
        )}
      </div> */}
      <div className="Reassurance">
        <div>
          <img src={image1} />
          <h4>Garantie 2 ans</h4>
        </div>
        <div>
          <img src={image2} />
          <h4>Livraison Gratuite</h4>
        </div>
        <div>
          <img src={image3} />
          <h4>Satisfait ou Remboursé</h4>
        </div>
        <div>
          <img src={image4} />
          <h4>Livraison Rapide</h4>
        </div>
      </div>
    </section>
  );
};
export default Home;