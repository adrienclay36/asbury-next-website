import React, { useContext, useState } from "react";
import { UserContext } from "../../store/user-context";
import { useRouter } from "next/router";
import { HiOutlinePhotograph } from "react-icons/hi";
import Dropzone from "react-dropzone";
import SkeletonPost from "../ui/skeleton-post";
import Image from "next/image";
import { Modal, PasswordInput, Button } from "@mantine/core";
import { AiOutlineCheckCircle } from "react-icons/ai";
import UIModal from "../ui/modal/UIModal";
import { Loader } from "@mantine/core";
import { supabase } from "../../supabase-client";
import { updateItemInTable } from "../../supabase-util";
import { FiKey } from "react-icons/fi";
const UserProfileCard = ({ user }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const changePasswordHandler = async () => {
    setError("");
    setSubmitting(true);
    if (password) {
      try {
        const { data, error } = await supabase.auth.update({ password });
        if (error) {
          throw new Error();
        }
        setChangePassword(false);
        setSubmitting(false);
        setPasswordSuccess(true);
        setPassword("");
      } catch (error) {
        setError("Invalid Password - Must be 6 Characters in Length");
        setSubmitting(false);
      }
    }
  };

  const uploadPhoto = async (files) => {
    setLoading(true);
    const imageFile = files[0];
    const newAvatarPath = `${userContext.user.id}/${imageFile.name}`;

    if (imageFile.type === "image/jpeg" || imageFile.type === "image/png") {
      if (userContext.avatarPath !== "default-2.png") {
        try {
          const { data, error } = await supabase.storage
            .from("avatars")
            .remove([userContext.avatarPath]);
          if (error) throw Error;
        } catch (err) {
          console.log(err.message);
        }
      }
      try {
        const { data: photoData, error: photoError } = await supabase.storage
          .from("avatars")
          .upload(newAvatarPath, imageFile);
        if (photoError) {
          console.log(photoError);
          throw new Error();
        }
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
      const response = await updateItemInTable("users", userContext.user.id, {
        avatar_url: newAvatarPath,
      });
    } else {
      console.log("Wrong Type");
      setWrongType(true);
      setLoading(false);
      return;
    }

    setLoading(false);
    userContext.checkUser();
  };
  if (userContext.loading) {
    return <SkeletonPost />;
  }

  return (
    <>
      <Modal centered opened={success} onClose={() => setSuccess(false)}>
        <div className="flex flex-1 flex-col justify-center items-center text-center">
          <AiOutlineCheckCircle size={75} className="text-emerald-700 mb-12" />
          <p className="font-semibold text-lg">
            Your Profile picture has been updated successfully! This make take a
            while to show up everywhere.
          </p>
        </div>
      </Modal>

      <UIModal
        centerModal={true}
        opened={wrongType}
        onClose={() => setWrongType(false)}
        type="error"
        message="Profile pictures must be a JPEG (.jpg) or PNG (.png)"
      />

      <Modal
        centered
        opened={changePassword}
        onClose={() => setChangePassword(false)}
      >
        <PasswordInput
          id="password"
          label="New Password"
          description="Password must be at least six characters"
          error={error}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-6 mb-6">
          <Button
            type="submit"
            loading={submitting}
            onClick={changePasswordHandler}
            variant="filled"
            leftIcon={<FiKey size={20} />}
            className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
          >
            Change Password
          </Button>
        </div>
      </Modal>

      <UIModal
        type="success"
        message="Password Changed!"
        centerModal={true}
        opened={passwordSuccess}
        onClose={() => setPasswordSuccess(false)}
      />

      <div className="flex flex-1 flex-col justify-center p-10 items-center w-11/12 lg:w-2/6 md:w-4/6 border-2 rounded-lg shadow-md mx-auto my-12">
        <div className="mb-8">
          <Image
            loading="lazy"
            key={userContext.user.id}
            height={200}
            width={200}
            className="rounded-full object-cover shadow-lg"
            src={userContext.avatarURL}
            alt={userContext.firstName}
          />
          <p className="mt-4 font-extrabold text-center">
            {userContext.firstName} {userContext.lastName}
          </p>
          <p className="font-semibold text-seaFoam-500 text-center">
            {userContext.title}
          </p>
        </div>


        {!loading && (
          <Dropzone onDrop={(files) => uploadPhoto(files)}>
            {({ getRootProps, getInputProps }) => (
              <section className="p-10 border-2 rounded-lg flex flex-1 justify-center items-center w-full mx-auto">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <HiOutlinePhotograph size={50} />
                </div>
              </section>
            )}
          </Dropzone>
        )}
        {loading && <Loader color="dark" size="lg" variant="dots" />}

        <button
          onClick={() => setChangePassword(true)}
          className="mt-12 font-semibold text-gray-500 hover:underline"
        >
          Change Your Password
        </button>
      </div>
    </>
  );
};

export default UserProfileCard;
