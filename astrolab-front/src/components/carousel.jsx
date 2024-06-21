import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../public/images/jaeger_verso-500x500.jpeg';
import image2 from '../../public/images/vc-american-brown.webp';
import image3 from '../../public/images/omega-moonwatch--500x500.jpg';
import image4 from '../../public/images/lang-f-768x768.jpg';

function Responsive() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className="Slick-img" src={image1} />
        </div>
        <div>
          <img className="Slick-img" src={image2} />
        </div>
        <div>
          <img className="Slick-img" src={image3} />
        </div>
        <div>
          <img className="Slick-img" src={image4} />
        </div>
      </Slider>
    </div>
  );
}

export default Responsive;
