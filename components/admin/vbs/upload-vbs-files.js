import React, { useRef, useState } from "react";
import AsburyButton from "../../ui/AsburyButton";
import { BsFillTrash2Fill } from "react-icons/bs";
import { supabase } from "../../../supabase-client";
import { Progress } from "@mantine/core";
const UploadVBSFiles = ({ existingFiles, getFiles }) => {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);
  const uploadFiles = async () => {
    setLoading(true);
    if (files) {
      const progressTotal = files.length;

      for (let i = 0; i < files.length; i++) {
        const { data, error } = await supabase.storage
          .from("vbs-files")
          .upload(`2022/${files[i].name}`, files[i]);
        if (error) {
          alert(
            `Error uploading file: ${files[i]?.name}\n\nThe error was caused by: ${error?.message}`
          );
        }

        setProgress((i + 1 / progressTotal) * 100);
      }
      await getFiles();
      inputRef.current.value = null;
      setFiles(null);
      setProgress(0);
    }
    setLoading(false);
  };

  const deleteFile = async (fileName) => {
    setLoading(true);
    const confirmation = confirm(
      "Are you sure you want to delete this file? This action cannot be undone."
    );

    if (confirmation) {
      const { data, error } = await supabase.storage
        .from("vbs-files")
        .remove([`2022/${fileName}`]);
      if (error) {
        console.log("error removing file:: ", error.message);
        setLoading(false);
        return;
      }
      await getFiles();
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center items-center">
        <input
          ref={inputRef}
          multiple
          className="my-6"
          onChange={(e) => setFiles(e.target.files)}
          type="file"
          required
        />
        <AsburyButton
          disabled={!files}
          loading={loading}
          text="Upload Files"
          onClick={uploadFiles}
        />
      </div>
      <Progress
        animate
        striped
        className="my-8 w-11/12 lg:w-3/6 md:w-3/6 mx-auto"
        value={progress}
      />
      <div>
        {existingFiles.map((file) => (
          <div
            className="flex flex-1 justify-between items-center bg-white rounded-lg shadow-md p-6 w-11/12 lg:w-2/6 md:w-3/6 mx-auto mt-4"
            key={file?.name}
          >
            <p>{file?.name}</p>
            <button disabled={loading} onClick={() => deleteFile(file?.name)}>
              <BsFillTrash2Fill
                size={20}
                className="text-red-600 cursor-pointer hover:text-red-700"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadVBSFiles;
