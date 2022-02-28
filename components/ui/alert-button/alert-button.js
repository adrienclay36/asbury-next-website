import React, { useState } from 'react'
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
import { Popover, Button } from '@mantine/core'
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { useMediaQuery } from '@mantine/hooks';
const AlertButton = ({ open, buttonText, loadingAction, popoverText, onClick, color, position , placement, type, icon}) => {
    const mobileWidth = useMediaQuery('(max-width: 900px)');
  return (
    <Popover
      opened={open}
      target={
        <div className="text-center w-full flex flex-1 justify-center items-center">
          <Button
            type="submit"
            disabled={loadingAction}
            loading={loadingAction}
            variant="filled"
            leftIcon={icon ? icon : ''}
            style={{ fontFamily: "Red Hat Display" }}
            className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
          >
            {buttonText}
          </Button>
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