import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase-client";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
import HRThin from "../../ui/HRThin";
import { getSignedUrl } from "../../../supabase-util";
import { useRouter } from "next/router";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import AlertButton from "../../ui/alert-button/alert-button";
const WorshipServiceOperations = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState(false);
  const [liveLink, setLiveLink] = useState("");
  const [settingLink, setSettingLink] = useState(false);
  const [removingLink, setRemovingLink] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
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

    if (linkSuccess) {
      const timeout = setTimeout(() => {
        setLinkSuccess(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success, linkSuccess]);

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
  };

  const updateLiveLinkHandler = async (e) => {
    e.preventDefault();
    setSettingLink(true);
    const { data } = await supabase.from("live_source").select();
    if (data.length > 0) {
      const idToDrop = data[0].id;
      await supabase.from("live_source").delete().match({ id: idToDrop });
    }
    await supabase.from("live_source").insert({ source: liveLink });
    setLiveLink("");
    setSettingLink(false);
    setLinkSuccess(true);
  };

  const removeCurrent = async (e) => {
    e.preventDefault();
    setRemovingLink(true);
    const { data } = await supabase.from("live_source").select();
    if (data.length > 0) {
      const idToDrop = data[0].id;
      await supabase.from("live_source").delete().match({ id: idToDrop });
    }
    setRemovingLink(false);
  };

  return (
    <div className="container grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-24">
      <div className="container flex flex-1 flex-col justify-content items-center text-center border-2 p-10 w-11/12 lg:w-5/6 md:w-5/6 mb-12 rounded-lg shadow-md">
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
            <AlertButton
              type="success"
              popoverText="Successfully Uploaded Program!"
              buttonText="Upload Program"
              open={success}
              loadingAction={loading}
              icon={<HiOutlineDocumentAdd size={20} />}
            />
          </div>
        </form>
        <button
          type="button"
          onClick={downloadQRCode}
          className="bg-emerald-900 px-4 py-2 rounded-lg text-white uppercase mt-8 w-full"
          disabled={downloadingFile ? true : false}
        >
          {!downloadingFile ? "Download QR Code" : <DualRingLoader />}
        </button>
      </div>

      <div className="container flex flex-1 flex-col justify-content items-center text-center border-2 p-10 w-11/12 lg:w-5/6 md:w-5/6 mb-12 rounded-lg shadow-md">
        <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold uppercase ">
          Update Live Stream Link
        </h1>
        <HRThin />
        <form onSubmit={updateLiveLinkHandler}>
          <textarea
            type="text"
            className="px-2 mb-16 w-full"
            required
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            placeholder={"Facebook Live Link"}
          />
          <div className="text-center w-full">
            <AlertButton
              type="success"
              popoverText="Successfully Set The Live Stream!"
              buttonText="Update Livestream"
              open={linkSuccess}
              loadingAction={settingLink}
              icon={<BsCameraVideo size={20} />}
            />
          </div>
        </form>
        <button
          className="bg-emerald-900 px-4 py-2 rounded-lg text-white uppercase mt-8 w-4/6"
          type="button"
          onClick={removeCurrent}
          disabled={removingLink ? true : false}
        >
          {removingLink ? <DualRingLoader /> : "Remove Current Source"}
        </button>
      </div>
    </div>
  );
};

export default WorshipServiceOperations;
