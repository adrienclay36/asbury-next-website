import React from 'react'
import styles from './plan-card.module.css';
import { BsCreditCard2Front } from 'react-icons/bs';
import { Button } from '@mantine/core';
import HRThin from '../../ui/HRThin';

const PlanCard = ({ name, price, recurringPeriod, description, popularTag, onClickFunc }) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center border-2 shadow-md rounded-lg p-4 w-11/12 lg:w-full md:w-full">
      <p className="text-lg lg:text-2xl md:text-2xl uppercase text-seaFoam-600">
        {name}
      </p>
      <HRThin />
      <ul className="text-center font-semibold">
        <li className="mb-4 text-lg md:text-2xl lg:text-2xl">${price}</li>
        <li className="mb-4 text-gray-500">{recurringPeriod}</li>
        <li className="mb-4 text-gray-500">{description}</li>
      </ul>
      <div className="text-center w-11/12 lg:w-full md:w-full mx-auto mt-6">
        <Button
          onClick={() => onClickFunc(name)}
          type="button"
          variant="filled"
          leftIcon={<BsCreditCard2Front size={20} />}
          className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
        >
          Select This Plan
        </Button>
      </div>
    </div>
  );
}

export default PlanCard