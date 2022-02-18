import React from 'react'

const InfoCardVerticle = (props) => {
  return (
    <div className="container flex flex-1 flex-col justify-center items-center p-6 border-2 my-12 w-11/12 lg:w-3/6 md:w-3/6 shadow-lg rounded-lg">
      {props.icon}
      <h1 className="text-4xl text-center uppercase text-seaFoam-600 mb-6">
        {props.title}
      </h1>
      <p className="text-lg text-center mt-4 leading-loose mb-4 mx-auto w-full lg:w-11/12 md:w-11/12">
        {props.content}
      </p>
    </div>
  );
}

export default InfoCardVerticle