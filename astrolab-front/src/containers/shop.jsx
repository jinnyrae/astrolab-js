import { useState, useEffect } from 'react';
import InfinitText from '../components/infinitText';
import { displayAllProducts } from '../api/product';
import ProductCard from '../components/product-card';
import Reassurance from '../components/reassurance';

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    displayAllProducts()
      .then((res) => {
        if (res.status === 200) {
          setAllProducts(res.result);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <InfinitText />
      <h2 className="Shop__title">Nos Produits</h2>
      {allProducts.length > 0 && (
        <ul className="Card__container">
          {allProducts.map((item) => {
            return <ProductCard key={item.id} product={item} />;
          })}
        </ul>
      )}
      <Reassurance />
    </section>
  );
};
export default Shop;
