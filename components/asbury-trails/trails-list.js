import React from "react";
import { supabase } from "../../supabase-client";
import { useRouter } from 'next/router';
import moment from "moment";
import { formatTime } from "../../utils/dates";
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

  const downloadFile = async () => {
    const { data, error } = await supabase.storage.from('trails').getPublicUrl(file?.name);
    if(error) {
      console.log("Error getting public URL for file:: ", error.message);
    }
    router.push(data?.publicURL);
  }
  return (
    <div
      onClick={() => downloadFile()}
      className="p-10 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
    >
      <p>
        {file.name.length > 30 ? file?.name.slice(0, 30) + "..." : file?.name}
      </p>
      <p>Uploaded: {new Date(file?.created_at).toLocaleTimeString('en-US')}</p>
    </div>
  );
};

export default TrailsList;
