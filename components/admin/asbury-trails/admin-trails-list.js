import React, { useRef, useState, useEffect } from "react";
import { supabase } from "../../../supabase-client";
import { useRouter } from "next/router";
import AsburyButton from "../../ui/AsburyButton";
import moment from "moment";
import { TextInput } from "@mantine/core";

const AdminTrailsList = ({ existingFiles }) => {
  const [files, setFiles] = useState(existingFiles);
  const [title, setTitle] = useState("");
  const [newFiles, setNewFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const getFiles = async () => {
    const { data, error } = await supabase
      .from("asbury_trails")
      .select()
      .order("created_at", { ascending: false });
    if (error) {
      console.log(
        "Error refetching file info from asbury_trails:: ",
        error.message
      );
      return;
    }

    setFiles(data);
  };

  const checkPDFOrDuplicate = (file) => {
    if (file.type !== "application/pdf") {
      alert(
        "This form only accepts PDF uploads. Please select a PDF to upload a document."
      );
      inputRef.current.value = null;
      setNewFiles([]);
    }
    files.forEach(tempFile => {
      if(tempFile?.filename.includes(file.name)) {
        alert(`It looks like a file named ${file?.name} already exists. Please choose a different name for the file to proceed.`);
        inputRef.current.value = null;
        setNewFiles([]);
      }
    })
  };

  useEffect(() => {
    if (newFiles.length > 0) {
      checkPDFOrDuplicate(newFiles[0]);
    }
  }, [newFiles]);

  const uploadFiles = async () => {
    setLoading(true);
    if (newFiles[0]?.name && title) {
      const { data, error } = await supabase.storage
        .from("trails")
        .upload(newFiles[0]?.name, newFiles[0]);

      if (error) {
        alert(
          `Error uploading file: ${newFiles[0]?.name}\n\nThe error was caused by: ${error?.message}`
        );
        setLoading(false);
        inputRef.current.value = null;
        setNewFiles([]);
        return;
      }
      const { data: tableData, error: tableError } = await supabase
        .from("asbury_trails")
        .insert({
          display_name: title,
          filename: newFiles[0]?.name,
        });

      if (tableError) {
        alert(
          `Error inserting table data into asbury_trails:: `,
          tableError.message
        );
      }

      await getFiles();
      inputRef.current.value = null;
      setNewFiles([]);
      setTitle("");
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
          .from("trails")
          .remove([`${fileName}`]);
        if (error) {
          console.log("error removing file:: ", error.message);
          setDeleting(false);
          return;
        }

        const { data: tableData, error: tableError } = await supabase
          .from("asbury_trails")
          .delete()
          .match({ filename: fileName });
        if (tableError) {
          console.log(
            "Error removing table association:: ",
            tableError.message
          );
        }
      }
      await getFiles();
    }
    setDeleting(false);
    setSelectedFiles([]);
  };

  return (
    <div className="container">
      <p className="text-center text-xl font-semibold mb-4">Upload Files</p>
      <div className="flex flex-1 flex-col justify-center items-center">
        <input
          ref={inputRef}
          className="my-6"
          onChange={(e) => setNewFiles(e.target.files)}
          type="file"
          required
        />
        {newFiles.length > 0 && (
          <TextInput
            className="mt-4 mb-8"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Display Name"
            description="The name of this file as it should be displayed (eg. Trails Edition September 2022"
          />
        )}
        <AsburyButton
          disabled={!newFiles || title.length === 0}
          loading={loading}
          text="Upload File"
          onClick={() => uploadFiles()}
        />
      </div>
        <p className="text-center text-xl font-semibold mt-12 mb-4">Manage Existing Files</p>
      <div className="justify-center items-center flex flex-1 my-12">

        <AsburyButton
          color={`bg-red-600`}
          hoverColor="hover:bg-red-700"
          onClick={() => deleteSelected()}
          text={`Delete Selected (${selectedFiles?.length})`}
          disabled={selectedFiles.length === 0}
          loading={deleting}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {files.map((file) => (
          <FileItem
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            key={file.id}
            file={file}
          />
        ))}
      </div>
    </div>
  );
};

const FileItem = ({ file, setSelectedFiles, selectedFiles }) => {
  const router = useRouter();
  const format = "MM-DD-YYYY hh:mm A";

  const selectFile = (fileName) => {
    if (selectedFiles.some((tempFile) => tempFile === fileName)) {
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

  const formatDate = moment(new Date(file?.created_at)).format(format);

  //   const downloadFile = async () => {
  //     const { data, error } = await supabase.storage
  //       .from("trails")
  //       .getPublicUrl(file?.filename);
  //     if (error) {
  //       console.log("Error getting public URL for file:: ", error.message);
  //     }
  //     router.push(data?.publicURL);
  //   };
  return (
    <>
      <div
        onClick={() => selectFile(file?.filename)}
        className={`p-10 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer ${
          selectedFiles.some((selectedFile) =>
            selectedFile.includes(file?.filename)
          )
            ? "bg-slate-200 font-semibold"
            : "bg-white"
        }`}
      >
        <p>
          {file.display_name.length > 30
            ? file?.display_name.slice(0, 30) + "..."
            : file?.display_name}
        </p>
        <p className="my-2">File Name: {file?.filename}</p>

        <p>Uploaded: {formatDate}</p>
      </div>
    </>
  );
};

export default AdminTrailsList;
