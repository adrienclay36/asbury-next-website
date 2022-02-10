import React from 'react';

const GivingCard = () => {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center mx-auto shadow-lg border-2 rounded-lg m-12 w-11/12 lg:w-2/6 md:11/12 p-10">
      <h1 className="mx-10 text-xl lg:text-3xl md:text-3xl uppercase text-seaFoam-700">Thank you</h1>
      <p className="text-xl uppercase text-seaFoam-400 font-semibold my-4">
        From Asbury
      </p>

      <div>
        <p className="py-4 text-center leading-loose">
          Thank you for considering a gift to Asbury United Methodist Church –
          Albuquerque. Your tithes, offerings and donations enable our church to
          fulfill its mission to love God and one another in Jesus Christ as we
          raise up a new generation of Christians.
        </p>
        <p className="py-4 text-center leading-loose">
          In addition to donating in person during our Sunday worship services,
          you can also give in the following ways:
        </p>
      </div>
    </div>
  );
};

export default GivingCard;
