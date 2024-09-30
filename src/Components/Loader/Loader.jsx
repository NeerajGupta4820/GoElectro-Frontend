import React from 'react';
import './Loader.css'; 

const Loader = ({ type }) => {
  return (
    <div className="loader-container">
      {type === 'page' ? (
        <div className="dot-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : type === 'data' ? (
        <div className="line-loader">
          <div className="horizontal-line"></div>
          <div className="horizontal-line"></div>
          <div className="horizontal-line"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
