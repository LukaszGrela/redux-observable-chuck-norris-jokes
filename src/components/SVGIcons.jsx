import React from 'react';
const Path = ({ type }) => {
  switch (type) {
    case 'pause':
      return (
        <path d="M16,50.625v-37.25h10.625v37.25H16z M37.375,13.375H48v37.25H37.375V13.375z" />
      );

    case 'play':
    default:
      return <path d="M17.375,13.375L46.625,32l-29.25,18.625V13.375z" />;
  }
};
const SVGIcon = ({ type }) => (
  <svg
    id={`svg-icon-${type}`}
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 64 64">
    <Path type={type} />
  </svg>
);

export default SVGIcon;
