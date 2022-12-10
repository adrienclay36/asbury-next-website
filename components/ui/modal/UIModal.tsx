import React from 'react'
import { Modal } from '@mantine/core';
import { BiErrorCircle } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';

interface Props {
  type: "error" | "success";
  message?: string;
  href?: string;
  actionText?: string;
  opened?: boolean;
  onClose?: () => void;
  centerModal?: boolean;
  icon?: React.ReactNode;
  transitionDuration?: number;
}
const UIModal: React.FC<Props> = ({ type, message, href, actionText, opened, onClose, centerModal, icon, transitionDuration = 350}) => {
    const router = useRouter();
  return (
    <Modal transitionDuration={transitionDuration} centered={centerModal} opened={opened} onClose={onClose}>
      <div className="flex flex-1 flex-col justify-center items-center text-center">
        {type == "error" && (
          <BiErrorCircle className="mb-12 text-red-600" size={75} />
        )}

        {type == "success" && (
          <AiOutlineCheckCircle size={75} className="text-emerald-700 mb-12" />
        )}
        <p className="font-semibold text-lg mb-4">{message}</p>
        {icon}
        {actionText && (
          <button
            onClick={() => router.push(href)}
            className="hover:underline text-gray-500 font-semibold"
          >
            {actionText}
          </button>
        )}
      </div>
    </Modal>
  );
}

export default UIModal