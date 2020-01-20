import React, { useState } from 'react';

const Card = ({ item, dispatch }) => {
  const [show, setShow] = useState(false);

  const { features } = item;
  const shortItem = [...features].splice(0, 3);
  const visibleLink = features.length > 3;
  const price = String(item.price).replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, ' $1 ').trim();

  return <div className="card">
      <div className="cardImg">
          <img src={item.images[0]} alt={item.model_name}/>
      </div>
      <div className="cardInfo">
        <h2 className="cardTitle">{item.model_name}</h2>
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
    </div>;
};
export default Card;
