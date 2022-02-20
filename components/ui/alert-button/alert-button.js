import React, { useState } from 'react'
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
import { Popover } from '@mantine/core'
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { useMediaQuery } from '@mantine/hooks';
const AlertButton = ({ open, buttonText, loadingAction, popoverText, onClick, color, position , placement, type}) => {
    const mobileWidth = useMediaQuery('(max-width: 900px)');
  return (
    <Popover
      opened={open}
      target={
        <div className="text-center w-full flex flex-1 justify-center items-center">
          <button
            onClick={onClick}
            className={`${
              color ? color : "bg-emerald-900"
            } px-6 py-2 text-white rounded-lg shadow-md`}
          >
            {loadingAction ? <DualRingLoader /> : buttonText}
          </button>
        </div>
      }
      width={mobileWidth ? 100 : 260}
      position={`${position ? position : "bottom"}`}
      placement={`${placement ? placement : "center"}`}
      withArrow
    >
      <div className="flex items-center">
        {type === "success" && !mobileWidth && (
          <FcCheckmark className="h-30 w-30 border-emerald-100" size={40} />
        )}
        {type === "error" && !mobileWidth && (
          <FcCancel className="h-30 w-30 border-emerald-100" size={40} />
        )}
        <p className={` lg:text-left md:text-left lg:ml-4 md:ml-4 text-sm`}>
          {popoverText}
        </p>
      </div>
    </Popover>
  );
}

export default AlertButton