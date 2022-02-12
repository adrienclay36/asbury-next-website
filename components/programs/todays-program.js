import React, { useState } from 'react'
import HRThin from '../ui/HRThin';
import DualRingLoader from '../dual-ring-loader/DualRingLoader';
import { getSignedUrl } from '../../supabase-util';
import { useRouter } from 'next/router';
const TodaysProgram = ({ file }) => {
  const [loading, setLoading] = useState(false);
    const router = useRouter();

    const downloadFile = async () => {
      setLoading(true);
        const url = await getSignedUrl("programs", `programs/${file.name}`);
        router.push(url);
        setLoading(false);
    }
  return (
    <div className="container w-11/12 lg:w-3/12 md:w-3/12 flex flex-1 flex-col justify-center items-center border-2 p-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-seaFoam-600 text-center uppercase mb-4">
        Today&apos;s Program
      </h1>
      <HRThin/>
      <p className="text-lg w-full lg:w-3/6 md:w-3/6 text-center mb-4">
        Thanks for joining us!
      </p>
      <p className="text-lg w-full lg:w-3/6 md:w-3/6 text-center mb-10">
        You can download today&apos;s program below:
      </p>
      <button onClick={downloadFile} disabled={file && !loading ? false : true} className="bg-seaFoam-700 text-white uppercase px-4 py-2 rounded-lg w-full">{file && !loading ? 'Download Program' : <DualRingLoader/>}</button>
    </div>
  );
}

export default TodaysProgram