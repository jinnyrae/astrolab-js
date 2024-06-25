import image1 from '../../public/images//Warranty-300x300.png';
import image2 from '../../public/images/free-300x300.png';
import image3 from '../../public/images/refund-300x300.png';
import image4 from '../../public/images/free-300x300.png';

const Reassurance = () => {
  return (
    <section>
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
export default Reassurance;
