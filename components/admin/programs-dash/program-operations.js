import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase-client";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
import HRThin from '../../ui/HRThin';
import { getSignedUrl } from "../../../supabase-util";
import { useRouter } from "next/router";
const ProgramOperations = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success]);

  const handleFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (file) {
      const fileName = `${new Date().getTime().toString()}_${file.name}`;
      await supabase.storage
        .from("programs")
        .upload(`programs/${fileName}`, file);
      const { data, error } = await supabase.storage
        .from("programs")
        .list("programs", {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });
      const oldFile = data[1];

      await supabase.storage
        .from("programs")
        .remove([`programs/${oldFile.name}`]);
      setLoading(false);
      setSuccess(true);
      e.target.files = null;
    }
  };

  const downloadQRCode = async (e) => {
      const url = await getSignedUrl("programs", `qrcodes/programs.png`);
      router.push(url);
  }
  return (
    <div>
      <div className="container flex flex-1 flex-col justify-content items-center mt-24 text-center border-2 p-10 w-11/12 lg:w-2/6 md:w-2/6 rounded-lg shadow-md">
        <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold uppercase ">
          Upload Today&apos;s Program
        </h1>
        <HRThin />
        <form onSubmit={handleFile}>
          <input
            className="mb-12 mt-10 w-11/12 mx-auto"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            required
          />
          <div>
            <button
              type="submit"
              className="bg-emerald-900 px-4 py-2 rounded-lg text-white uppercase mb-8 w-full"
              disabled={loading ? true : false}
            >
              {!loading ? "Upload Program" : <DualRingLoader />}
            </button>
            {success && (
              <p className="text-green-700 text-lg">Program Uploaded!</p>
            )}
          </div>
        </form>
      </div>

      <div className="container flex flex-1 flex-col justify-content items-center mt-10 mb-10 text-center border-2 p-10 w-11/12 lg:w-2/6 md:w-2/6 rounded-lg shadow-md">
        <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold uppercase ">
          Download The QR Code
        </h1>
        <HRThin />
        <button
          onClick={downloadQRCode}
          className="bg-emerald-900 px-4 py-2 rounded-lg text-white uppercase mt-8 w-full"
          disabled={downloadingFile ? true : false}
        >
          {!downloadingFile ? "Download QR Code" : <DualRingLoader />}
        </button>
      </div>
    </div>
  );
};

export default ProgramOperations;
