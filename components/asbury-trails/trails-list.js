/* eslint-disable @next/next/no-img-element */
import React from "react";
import { supabase } from "../../supabase-client";
import { useRouter } from "next/router";
import moment from "moment";
import Image from "next/image";
const TrailsList = ({ files }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

const FileItem = ({ file }) => {
  const router = useRouter();
  const format = "MM-DD-YYYY hh:mm A";
  console.log(file?.created_at);

  const formatDate = moment(new Date(file?.created_at)).format(format);

  const downloadFile = async () => {
    const { data, error } = await supabase.storage
      .from("trails")
      .getPublicUrl(file?.filename);
    if (error) {
      console.log("Error getting public URL for file:: ", error.message);
    }
    router.push(data?.publicURL);
  };
  return (
    <div
      onClick={() => downloadFile()}
      className="bg-white shadow-md hover:bg-gray-200 cursor-pointer"
    >
      <img
        src="/images/trails_image.jpg"
        className="object-cover w-full h-52"
      />
      <div className="p-4 flex flex-1 justify-between items-center">
        <p className="font-semibold text-lg lg:text-xl md:text-lg">
          {file.display_name.length > 30
            ? file?.display_name.slice(0, 30) + "..."
            : file?.display_name}
        </p>
        <p className="font-semibold text-seaFoam-600">
          {new Date(file?.created_at).toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default TrailsList;
