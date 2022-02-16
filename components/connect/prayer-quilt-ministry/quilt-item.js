import React from 'react'

const QuiltItem = ({ title, icon, extraMargin}) => {
  return (
    <div
      className={`mb-6 p-4 flex flex-1 flex-col justify-center items-center border-2 rounded-lg shadow-md`}
    >
      <div className="mb-4">{icon}</div>
      <p className="text-2xl text-center">{title}</p>
    </div>
  );
}

export default QuiltItem