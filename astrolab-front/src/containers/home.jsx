import { useEffect, useState } from 'react';
import InfinitText from '../components/infinitText';
import SimpleSlider from '../components/carousel';
import Video from '../../public/images/Manufacture-horloge-Complications-online-video-cutter.com-1.mp4';

import { favoriteProducts } from '../api/product';
import Favorite from '../components/favorite';
import Reassurance from '../components/reassurance';

const Home = () => {
  const [favorite, setFavorite] = useState([]);

  const getFavorites = (favo) => {
    const data = { favorite: favo };

    favoriteProducts(data)
      .then((res) => {
        if (res.status === 200) {
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
      <Reassurance />
    </section>
  );
};

export default Home;
