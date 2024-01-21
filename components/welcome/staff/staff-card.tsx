import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Modal } from '@mantine/core';
interface Props {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  email?: string;
}

const StaffCard: React.FC<Props> = ({ name, jobTitle, description, image, email }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <Modal trapFocus={false} opened={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="text-center mb-4">

      <Image src={image} height={300} width={300} className="rounded-md"/>
      </div>
      <div className="text-left p-0 lg:p-4 md:p-4">

      <p className="font-semibold text-lg">{name}</p>
      <p className="font-semibold text-gray-400">{jobTitle}</p>
      {email && <p className="font-semibold text-gray-400">{email}</p>}
      <p className="my-4 text-gray-600">{description}</p>
      </div>
    </Modal>
    <motion.div onClick={() => setModalOpen(true)} whileHover={{ scale: 1.1  }} whileTap={{ scale: .99 }} style={{ width: 300, height: 400 }} className="text-center container cursor-pointer">

    <div className="flex flex-1 justify-center items-center">
      <Image src={image} height={300} width={300} className="rounded-full"/>
    </div>
    <div className="mb-8">

      <p className="font-semibold my-3">{name}</p>
      <p>{jobTitle}</p>
    </div>
    </motion.div>
    </>
  );
};

export default StaffCard;
