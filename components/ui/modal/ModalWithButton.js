import React from 'react'
import AsburyButton from '../AsburyButton'
import { Modal } from '@mantine/core'
const ModalWithButton = ({ title, text, buttonText, onClick, opened, onClose, centerModal = true, icon= null, bold = false  }) => {
  return (
    <Modal opened={opened} padding={50} onClose={onClose} centered={centerModal}>
        <div className="flex flex-1 flex-col justify-center items-center text-center">
        
            <h1 className="text-xl font-semibold mb-4">{title}</h1>
            {icon}
            <p className={`text-lg ${bold && 'font-semibold'}`}>{text}</p>
            <AsburyButton text={buttonText} onClick={onClick}/>
        </div>
    </Modal>
  )
}

export default ModalWithButton