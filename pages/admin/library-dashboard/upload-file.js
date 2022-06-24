import React, { useContext, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { supabase } from "../../../supabase-client";
import PageLoading from "../../../components/PageLoading/PageLoading";
import UIModal from "../../../components/ui/modal/UIModal";
import { checkAdmin } from "../../../supabase-util";
import axios from "axios";
import { UserContext } from "../../../store/user-context";
const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [existingFile, setExistingFile] = useState(null);
  const userContext = useContext(UserContext);

  const getExistingFile = async () => {
    const { data, error: existingFileError } = await supabase.storage
      .from("library")
      .list();
    if (!existingFileError) {
      setExistingFile(data[0]);
    }
  };

  useEffect(() => {
    getExistingFile();
  }, []);

  const uploadFile = async (files) => {
    if (files[0]) {
      setLoading(true);

      const { data: existingFile, error: existingFileError } =
        await supabase.storage.from("library").list();

      if (existingFileError) {
        console.log(
          "Error getting existing files:: ",
          existingFileError.message
        );
        axios.post("/api/write-logs", {
          type: "error",
          message: existingFileError.message,
          user: `${userContext?.firstName} ${userContext?.lastName}`,
        });

        setError(true);
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      const { data: removeData, error: removeError } = await supabase.storage
        .from("library")
        .remove([existingFile[0]?.name]);

      if (removeError) {
        console.log("Error removing old excel file:: ", removeError.message);
        axios.post("/api/write-logs", {
          type: "error",
          message: removeError.message,
          user: `${userContext?.firstName} ${userContext?.lastName}`,
        });

        setError(true);
        setErrorMessage(removeError.message);
        setLoading(false);
        return;
      }
      const { data, error: uploadError } = await supabase.storage
        .from("library")
        .upload(files[0]?.name, files[0]);
      if (uploadError) {
        console.log(uploadError);
        console.log("error uploading file:: ", error.message);
        axios.post("/api/write-logs", {
          type: "error",
          message: uploadError.message,
          user: `${userContext?.firstName} ${userContext?.lastName}`,
        });
        setError(true);
        setErrorMessage(uploadError.message);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        setSuccess(true);
        axios.post("/api/write-logs", {
          type: "success",
          message: "Successfully uploaded XLS File",
          user: `${userContext?.firstName} ${userContext?.lastName}`,
        });
        getExistingFile();
      }
    }
  };
  return (
    <AdminLayout>
      {loading && <PageLoading />}
      <UIModal
        type="success"
        message="This file has been uploaded successfully!"
        opened={success}
        onClose={() => setSuccess(false)}
      />
      <UIModal
        type="error"
        message={errorMessage}
        opened={error}
        onClose={() => setError(false)}
      />
      {!loading && (
        <div className="container w-11/12 lg:w-2/6 md:w-2/6 mt-6">
          <Dropzone onDrop={(files) => uploadFile(files)}>
            {({ getRootProps, getInputProps }) => (
              <section className="p-10 border-2 border-dashed rounded-lg flex flex-1 justify-center items-center w-full mx-auto">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="font-bold text-gray-500 text-center">
                    Drag and Drop or Click Here To Add Excel File
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      )}
      {existingFile && (
        <div className="mt-4">
          <p className="text-lg font-semibold text-center">Existing File</p>
          <div className="shadow-md rounded-lg p-10 w-2/6 mx-auto">
            <p className="text-center">File Name: {existingFile?.name}</p>
            <p className="text-center">
              Uploaded: {new Date(existingFile?.created_at).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UploadFile;

export const getServerSideProps = async ({ req, res }) => {
  return checkAdmin(req);
};
