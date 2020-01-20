import React, { useEffect, useReducer, useRef } from 'react';
import cars from '../utils/cars';

// components

import Card from './carCard';

const Home = () => {
  const timeout = useRef();
  const [data, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'init':
        return { ...payload };
      default:
        return state;
    }
  }, {});

  useEffect(() => {
    timeout.current = setTimeout(() => dispatch({ type: 'init', payload: cars }), 1000);
    return () => clearTimeout(timeout.current);
  }, []);
  console.log({ data });
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
