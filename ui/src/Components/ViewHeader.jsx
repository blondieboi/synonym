import React from 'react';

const ViewHeader = ({ title, subtitle }) => {
  return (
    <div className="view-header">
      <h1 className="title">{title}</h1>
      <h4 className="subtitle">{subtitle}</h4>
    </div>
  );
};

export default ViewHeader;
