import React from 'react'
import Image from 'next/image';
const PreviewComment = ({ author, date, content}) => {
    const formatDate = new Date(date).toLocaleDateString("en-US", {timeZone: "America/Denver"});
  return (
      <>
      <div className="flex flex-1 justify-start items-center ml-4">


          <Image src="/images/default-2.png" height={25} width={25} alt="default image"/>
          
    <div className="px-4 py-1 bg-gray-200 w-10/12 lg:w-3/6 md:w-3/6 ml-2 rounded-full mt-4 mb-2">
        <p className="font-bold text-sm ml-1">{author}</p>
        <p className="text-sm ml-1">{content}</p>
    </div>
      </div>


      </>
  )
}

export default PreviewComment