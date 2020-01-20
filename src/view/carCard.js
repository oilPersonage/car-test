import React, { useState } from 'react';

const Card = ({ item, distance, index }) => {
  const [show, setShow] = useState(false);

  const {
    features, model_name, dealer, images,
  } = item;
  const shortItem = [...features].splice(0, 3);
  const visibleLink = features.length > 3;
  const price = String(item.price).replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, ' $1 ').trim();
  const arrAddress = [dealer.name, dealer.city, dealer.address];
  if (distance[index]) arrAddress.push(`${distance[index]}км`);
  const address = arrAddress.join(', ');
  return <div className="card">
      <div className="cardImg">
          <img src={images[0]} alt={model_name}/>
      </div>
      <div className="cardInfo">
        <h2 className="cardTitle">{model_name}</h2>
        <p className="cardPrice">{price}₽</p>
        {features.length > 0 && <p className="cardFeatures">Особенности:</p>}
            <ul>
                {!show && visibleLink
                  ? shortItem.map((el) => <li key={el}>{el}</li>)
                  : features.map((el) => <li key={el}>{el}</li>)
                }
            </ul>
        {visibleLink && <div className='cardMore' onClick={() => setShow(!show)}>{!show
          ? `еще ${features.length - 3} особенностей`
          : 'Скрыть'
            }
        </div>
        }
    </div>
    <a target='__blank'href={dealer.url} className="cardAddress">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="97.713px" height="97.713px" viewBox="0 0 97.713 97.713">
      <path d="M48.855,0C29.021,0,12.883,16.138,12.883,35.974c0,5.174,1.059,10.114,3.146,14.684
        c8.994,19.681,26.238,40.46,31.31,46.359c0.38,0.441,0.934,0.695,1.517,0.695s1.137-0.254,1.517-0.695
        c5.07-5.898,22.314-26.676,31.311-46.359c2.088-4.57,3.146-9.51,3.146-14.684C84.828,16.138,68.69,0,48.855,0z M48.855,54.659
        c-10.303,0-18.686-8.383-18.686-18.686c0-10.304,8.383-18.687,18.686-18.687s18.686,8.383,18.686,18.687
        C67.542,46.276,59.159,54.659,48.855,54.659z"/>
      </svg>
      <p>{address}</p>
      </a>
    </div>;
};
export default Card;
