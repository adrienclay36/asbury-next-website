import React, { useState, useContext } from "react";
import { Select } from "@mantine/core";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
import { supabase } from "../../../supabase-client";
import axios from "axios";
import { UserContext } from "../../../store/user-context";
const NewPrayerForm = ({ setOpen }) => {
  const userContext = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    type: false,
    content: false,
  });
  const [postingError, setPostingError] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancelForm = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setType("");
    setContent("");
    setErrors({ name: false, email: false, type: false, content: false });
  };

  const addGuestPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPostingError(false);
    if (name && type && content) {
      let ipaddress = "";
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        ipaddress = ipResponse.data.ip;
      } catch (ipError) {
        console.log("Failed to get IP Address:: ", ipError.message);
      }
      const postToAdd = {
        author: name,
        email,
        posttype: type,
        postcontent: content,
        ipaddress,
        created_at: new Date(),
      };

      const { data, error } = await supabase.from("prayers").insert(postToAdd);
      if (error) {
        console.log("Error posting new prayer:: ", error.message);
      }
      cancelForm();

      setLoading(false);
      return;
    }

    if (!name) {
      setErrors({ ...errors, name: true });
    }

    if (!type) {
      setErrors({ ...errors, type: true });
    }

    if (!content) {
      setErrors({ ...errors, content: true });
    }
    setLoading(false);
  };

  const addUserPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPostingError(false);
    if (type && content) {
      const postToAdd = {
        author: `${userContext?.firstName} ${userContext?.lastName}`,
        posttype: type,
        postcontent: content,
        created_at: new Date(),
        user_id: userContext?.user?.id,
        avatar_url: userContext?.avatarURL,
      };
      const { data, error } = await supabase.from("prayers").insert(postToAdd);
      if (error) {
        console.log("Error adding using post:: ", error.message);
      }
      cancelForm();
      setLoading(false);
      return;
    }

    if (!name) {
      setErrors({ ...errors, name: true });
    }

    if (!type) {
      setErrors({ ...errors, type: true });
    }

    if (!content) {
      setErrors({ ...errors, content: true });
    }
    setLoading(false);
  };

  const noUserFields = (
    <>
      <div className="flex flex-col flex-1 mb-4">
        <label className="font-semibold mb-2 ml-1" htmlFor="name">
          Name <span className="text-red-800">*</span>
        </label>
        <input
          className="p-2 border-2 rounded-lg focus:outline-none active:outline-none"
          id="name"
          type="text"
          placeholder="Enter Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength="100"
        />
      </div>
      <div className="flex flex-col flex-1 mb-4">
        <label className="font-semibold mb-2 ml-1" htmlFor="email">
          Email (Optional)
        </label>
        <input
          className="p-2 border-2 rounded-lg focus:outline-none active:outline-none"
          id="email"
          type="email"
          placeholder="Email Is Optional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength="100"
        />
      </div>
    </>
  );

  return (
    <div className="container w-11/12 lg:w-2/6 md:w-3/6 border-2 p-8 rounded-lg shadow-md mt-6">
      <form className="container w-full" onSubmit={userContext?.user ? addUserPost : addGuestPost}>
        {!userContext?.user && noUserFields}
        <div className="flex flex-col flex-1 mb-4">
          <Select
            error={errors.type && "You must pick one"}
            onChange={setType}
            label="Is this a joy or concern?"
            data={[
              { value: "joy", label: "Joy" },
              { value: "concern", label: "Concern" },
            ]}
            required
            maxLength="100"
          />
        </div>
        <div className="flex flex-col flex-1 mb-4">
          <label className="font-semibold mb-2 ml-1" htmlFor="type">
            Content <span className="text-red-800">*</span>
          </label>
          <textarea
            rows="10"
            className="focus:outline-none active:outline-none border-2 rounded-md p-2"
            required
            placeholder="Posts are limited to 1000 characters"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="1000"
          />
        </div>
        <div className="text-left">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg shadow-lg border-2 bg-seaFoam-600 text-white mr-4"
            disabled={loading}
          >
            {loading ? <DualRingLoader /> : "Post"}
          </button>
          {!loading && (
            <button
              type="button"
              onClick={cancelForm}
              disabled={loading ? true : false}
              className="px-5 py-2 rounded-lg shadow-lg border-2 bg-gray-600 hover:bg-gray-800 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPrayerForm;
