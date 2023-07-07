import { Card, Title } from '@mantine/core'
import React from 'react'
import { PartyPopper } from 'lucide-react'
import AsburyButton from '../ui/AsburyButton'
import { useRouter } from 'next/router'
const DonationComplete = () => {
    const router = useRouter();
  return (
    <div className="my-24 p-12 bg-white w-3/6 mx-auto container shadow-md rounded-md">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4">Thank You!</h1>
        <p className="mb-4">Your donation has been received. Thank you for contributing to Asbury UMC!</p>
        <AsburyButton onClick={() => router.push("/")} text="Home"/>
    </div>
  )
}

export default DonationComplete