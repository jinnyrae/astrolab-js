import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { useRef } from 'react';
import { horizontalLoop } from '../helpers/gsap';
const boxesArr = [
  'Omega',
  "Nomo's",
  'Rolex',
  'Vacheron Constantin ',
  'Zenith',
  'IWC Schaffhausen',
  'Cartier',
  'Jaeger-LeCoultre',
  'Blancpain',
  'Yema',
  'Grand Seiko',
  'A.Lange & Sohne ',
  'Lip',
  'Breguet',
];
function InfinitText() {
  const boxesContainer = useRef();

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.box');

      const loop = horizontalLoop(boxes, { repeat: -1 });
    },
    {
      scope: boxesContainer,
    },
  );

  return (
    <div className="marquee">
      <div className="wrapper" ref={boxesContainer}>
        {boxesArr.map((el) => (
          <div key={`box-${el}`} className="box">
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfinitText;
