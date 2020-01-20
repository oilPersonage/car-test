import React, { useState } from 'react';

const Filter = ({ dispatch }) => {
  const [sort, setSort] = useState(true);
  const arr = [
    { text: 'По цене', active: true },
    { text: 'По удаленности', active: false },
  ];

  const onClick = () => {
    setSort(!sort);
    dispatch({ type: 'sort', payload: !sort });
  };

  return <div className="filter">
    Сортировать:
    {arr.map((el) => <div key={el.text} className="checkboxContainer" onClick={onClick}>
      <div className={`checkbox ${sort === el.active ? 'active' : null}`}>
        <span></span>
      </div>
      <p>{el.text}</p>
    </div>)}
  </div>;
};

export default Filter;
