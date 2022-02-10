import React from 'react'
import Layout from '../components/layout/layout';
import { MdNotListedLocation } from 'react-icons/md';
import Link from 'next/link';
const Custom404 = () => {
  return (
    <Layout title="Error" description="Not sure how you ended up here.. Head back to the main website to continue browsing!">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-lg lg:text-3xl md:text-3xl mt-24 mb-12">We&apos;re not sure how you got here...</h1>
            <MdNotListedLocation size={100} className="my-12 text-seaFoam-800" />
            <Link href="/" passHref>
                <button className="text text-xl border-2 p-4 rounded-md shadow-lg">Back To Safety!</button>
            </Link>
        </div>
    </Layout>
  )
}

export default Custom404