import React from 'react';
import graphic from 'assets/images/graphic-1.png';

const EmptyDataTable = () => {
  return (
    <div className="p-4">
      <img src={graphic} alt="graphic" style={{ width: 200 }} />
      <p className="font-weight-bold text-center mt-2">No data Record to display</p>
    </div>
  );
};

export default EmptyDataTable;
