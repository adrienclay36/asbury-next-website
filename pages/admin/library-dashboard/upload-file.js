import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { supabase } from "../../../supabase-client";
import PageLoading from "../../../components/PageLoading/PageLoading";
import UIModal from "../../../components/ui/modal/UIModal";
const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const uploadFile = async (files) => {
    

    if (files[0]) {
        setLoading(true);
      if (files[0]?.name !== "Web Search.xls") {
        setLoading(false);
        setError(true);
        setErrorMessage("Please only upload Web Search.xls in this form.");
        return;
      }

      const { data: removeData, error: removeError } = await supabase.storage
        .from("library")
        .remove(["Web Search.xls"]);

      if (removeError) {
        console.log("Error removing old excel file:: ", removeError.message);
        return;
      }
      const { data, error } = await supabase.storage
        .from("library")
        .upload("Web Search.xls", files[0]);
      if (error) {
        console.log("error uploading file:: ", error.message);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        setSuccess(true);
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
    </AdminLayout>
  );
};

export default UploadFile;
