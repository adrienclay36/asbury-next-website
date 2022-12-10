import React from 'react'
const MDOCard = () => {
  return (


    <div className="container flex flex-1 flex-col bg-gray-100 items-center justify-center mx-auto shadow-lg border-2 rounded-lg m-12 w-11/12 lg:w-2/6 md:w-11/12 p-10">
      <h1 className="mx-10 text-xl text-center lg:text-3xl md:text-2xl uppercase text-seaFoam-700">
        Mothers Day Out
      </h1>
      <p className="text-md lg:text-xl md:text-lg uppercase text-seaFoam-400 font-semibold my-4">
        Monday - Friday
      </p>
      <div className="h-0.5 w-3/6 rounded-lg bg-gray-200 mx-10 my-5"></div>
      <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-between items-center">
        <p className="py-2 text-md lg:text-lg md:text-md uppercase">7:30am</p>
        <p className="py-2 text-md uppercase mx-12 text-seaFoam-400">TO</p>
        <p className="py-2 text-md lg:text-lg md:text-md uppercase">5:30pm</p>
      </div>
      <div>
        <p className="py-4 text-center leading-loose">
          Mother’s Day Out and our preschool have been in operation since 1972,
          offering licensed child care for preschool children. Our curriculum
          incorporates science, math, language and social skills; as well as
          providing planned activities, including music, story time, snack time,
          crafts and outdoor activities.
        </p>
      </div>
    </div>
  );
}

export default MDOCard