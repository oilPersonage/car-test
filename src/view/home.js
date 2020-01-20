import React, {
  useEffect, useReducer, useRef, useMemo, useState,
} from 'react';
import cars from '../utils/cars';
import getDistance from '../utils/getDistance';

// components

import Card from './carCard';
import Filter from './filter';

const Home = () => {
  const timeout = useRef();
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [findDist, setFindDist] = useState(false);

  const [data, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'init':
        return [...payload];
      case 'coord':
        return [...state.map((el) => (
          { ...el, dealer: { ...el.dealer, distance: getDistance(coord.x, coord.y, el.dealer.latitude, el.dealer.longitude) } }
        ))];
      case 'sort':
        return [...state.sort((a, b) => (payload ? b.price - a.price : b.dealer.distance - a.dealer.distance))];
      default:
        return state;
    }
  }, []);


  useMemo(() => {
    if (findDist) {
      dispatch({ type: 'coord' });
    }
  }, [findDist]);

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
    timeout.current = setTimeout(() => {
      const arrData = Object.keys(cars).map((el) => cars[el]).sort((a, b) => b.price - a.price);
      dispatch({ type: 'init', payload: arrData });
      setFindDist(true);
    },
    1000);
    return () => clearTimeout(timeout.current);
  }, []);

  return <div className="container">
      <Filter dispatch={dispatch} />
      <div className="cardContainer">
      {data.map((item) => <Card
        key={item.id}
        item={item}
        index={item.id}
        dispatch={dispatch}
      />)}
      </div>
    </div>;
};

export default Home;
