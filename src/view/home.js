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
  const [distance, setDistance] = useState([]);

  const [data, dispatch] = useReducer((state, action) => {
    const { type, payload, index } = action;
    switch (type) {
      case 'init':
        return { ...payload };
      case 'coord':
        return { ...state, [index]: { ...state[index], dealer: { ...state[index].dealer, distance: payload } } };
      default:
        return state;
    }
  }, {});

  useMemo(() => {
    const arrDist = [];
    Object.keys(data).forEach((el) => {
      const length = getDistance(coord.x, coord.y, data[el].dealer.latitude, data[el].dealer.longitude);
      arrDist.push(+length.toFixed(2));
    });
    setDistance(arrDist);
  }, [coord.x, coord.y, data]);
  console.log(distance);
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
  console.log({ data });
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
        index={item}
        dispatch={dispatch}
        distance={distance}
      />)}
      </div>
    </div>;
};

export default Home;
