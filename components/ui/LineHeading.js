import React from 'react';

const LineHeading = (props) => {
  return (
    <div className="text-center flex flex-1 justify-center">
      <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      {props.children}
      <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
    </div>
  );
};

export default LineHeading;
