import React, { useRef, useState } from "react";
import AsburyButton from "../../ui/AsburyButton";
import { GrDocumentVerified } from "react-icons/gr";
import { supabase } from "../../../supabase-client";
import { Progress } from "@mantine/core";
import { getDateInfo } from "../../../utils/dates";
const UploadVBSFiles = ({ existingFiles, getFiles }) => {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
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

  const deleteSelected = async () => {
    setDeleting(true);
    const confirmation =
      selectedFiles?.length === 1
        ? confirm(
            "Are you sure you want to delete this file? This action cannot be undone."
          )
        : confirm(
            "Are you sure you want to delete these files? This action cannot be undone."
          );

    if (confirmation) {
      for (let fileName of selectedFiles) {
        const { data, error } = await supabase.storage
          .from("vbs-files")
          .remove([`2022/${fileName}`]);
        if (error) {
          console.log("error removing file:: ", error.message);
          setDeleting(false);
          return;
        }
      }
      await getFiles();
    }
    setDeleting(false);
    setSelectedFiles([]);
  };

  const selectFile = (fileName) => {
    if (selectedFiles.some((file) => file === fileName)) {
      setSelectedFiles((prevFiles) => {
        const filtered = prevFiles.filter((f) => f !== fileName);
        return filtered;
      });
    } else {
      setSelectedFiles((prevFiles) => {
        return [...prevFiles, fileName];
      });
    }
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
      {existingFiles.length > 0 && (
        <div className="justify-center items-center flex flex-1">
          <AsburyButton
            color={`bg-red-600`}
            hoverColor="hover:bg-red-700"
            onClick={deleteSelected}
            text={`Delete Selected (${selectedFiles?.length})`}
            disabled={selectedFiles.length === 0}
            loading={deleting}
          />
        </div>
      )}
      <div>
        {existingFiles.map((file) => {
          const { monthText, day } = getDateInfo(file?.created_at);
          return (
            <button
              disabled={loading}
              onClick={() => selectFile(file?.name)}
              className={`flex flex-1 justify-between items-center rounded-lg shadow-md p-6 w-11/12 lg:w-2/6 md:w-3/6 mx-auto mt-4 ${
                selectedFiles.some((selectedFile) =>
                  selectedFile.includes(file?.name)
                )
                  ? "bg-slate-200 font-semibold"
                  : "bg-white"
              }`}
              key={file?.name}
            >
              <GrDocumentVerified size={30} />
              <p className="flex-1 justify-center items-center">{file?.name}</p>
              <p className="flex-1 justify-center items-center">
                {monthText}, {day}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default UploadVBSFiles;
