import React, { useState } from 'react'
import { BsFileCheck } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { getSignedUrl } from '../../supabase-util';
const DownloadItem = ({ file, year }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const downloadFile = async () => {
      setLoading(true);
      const url = await getSignedUrl("vbs-files", `${year}/${file.name}`);
      router.push(url);
      setLoading(false);
    };
  return (
    <button onClick={downloadFile} className="container w-11/12 lg:w-2/6 md:w-3/6 flex flex-1 justify-center items-center my-4 p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-100">
        <BsFileCheck size={30} className="text-green-600 mr-4" />
      <p className="text-md">{file?.name}</p>
    </button>
  );
}

export default DownloadItem