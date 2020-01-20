import React, {
  useEffect, useReducer, useRef, useMemo, useState, useCallback,
} from 'react';
import cars from '../utils/cars';
import getDistance from '../utils/getDistance';

// components

import Card from './carCard';

const Home = () => {
  const timeout = useRef();
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [data, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'init':
        return { ...payload };
      default:
        return state;
    }
  }, {});

  useMemo(() => {
    Object.keys(data).forEach((el) => {
      const length = getDistance(coord.x, coord.y, data[el].dealer.latitude, data[el].dealer.longitude, data.element.name);
    });
  }, [coord.x, coord.y, data]);

  const findGeoPosition = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          setCoord({ x: coords.latitude, y: coords.longitude });
        },
        (error) => console.log(error));
      } else {
        throw new SyntaxError('Нельзя получить координаты');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findGeoPosition();
    timeout.current = setTimeout(() => dispatch({ type: 'init', payload: cars }), 1000);
    return () => clearTimeout(timeout.current);
  }, []);
  return <div className="container">
      <div className="cardContainer">
      {Object.keys(data).map((item) => <Card
        key={data[item].id}
        item={data[item]}
        dispatch={dispatch}
      />)}
      </div>
    </div>;
};

export default Home;
