import React, { useContext, useState } from "react";
import { UserContext } from "../../store/user-context";
import { useRouter } from "next/router";
import { HiOutlinePhotograph } from "react-icons/hi";
import Dropzone from "react-dropzone";
import SkeletonPost from "../ui/skeleton-post";
import Image from "next/image";
import { Modal, PasswordInput, Button, TextInput, Loader } from "@mantine/core";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import UIModal from "../ui/modal/UIModal";
import { RiUserSettingsFill } from 'react-icons/ri';
import { supabase } from "../../supabase-client";
import { updateItemInTable } from "../../supabase-util";
import { FiKey } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { GearIcon } from '@radix-ui/react-icons';
import SectionHeading from "../ui/section-heading";
import Link from "next/link";

const UserProfileCard = ({ user }) => {
  const userContext = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongType, setWrongType] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [editName, setEditName] = useState(false);
  const [firstName, setFirstName] = useState(userContext.firstName);
  const [lastName, setLastName] = useState(userContext.lastName);
  const router = useRouter();

  const changePasswordHandler = async () => {
    setError("");
    setSubmitting(true);
    if (password) {
      try {
        const { data, error: passError } = await supabase.auth.update({ password });
        if (passError) {
          throw new Error();
        }
        setChangePassword(false);
        setSubmitting(false);
        setPasswordSuccess(true);
        setPassword("");
      } catch (err) {
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
          const { data, error: uploadError } = await supabase.storage
            .from("avatars")
            .remove([userContext.avatarPath]);
          if (uploadError) throw Error;
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


  const removePhoto = async () => {
    setLoading(true);
    const newAvatarUrl = 'default-2.png';
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

    const response = await updateItemInTable('users', userContext.user.id, { avatar_url: newAvatarUrl });

    userContext.checkUser();
    setLoading(false);

  }


  const updateNameHandler = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    if(firstName && lastName) {
      const response = await updateItemInTable('users', userContext.user.id, { first_name: firstName, last_name: lastName });
      console.log(response);
      userContext.checkUser();
      setSubmitting(false);
      setEditName(false);
    }
  }


  

  return (
    <>
    <SectionHeading title="Your Profile">

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

      <Modal
        opened={editName}
        onClose={() => setEditName(false)}
        centered
        title={"Edit Username"}
        >
        <div>
          <form onSubmit={updateNameHandler}>
            <TextInput
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              label="First Name"
              required
              />
            <TextInput
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              label="Last Name"
              required
              />
            <Button
              type="submit"
              loading={submitting}
              variant="filled"
              leftIcon={<GearIcon size={20} />}
              className="text-white bg-emerald-900 hover:bg-emerald-800 w-full mt-6"
              >
              Submit
            </Button>
          </form>
        </div>
      </Modal>

      <div className="flex flex-1 flex-col justify-center p-10 items-center w-11/12 lg:w-2/6 md:w-4/6 border-2 rounded-lg shadow-md mx-auto my-12">
        <div className="mb-8">
          <Image
            key={userContext.user.id}
            height={200}
            width={200}
            className="rounded-full object-cover shadow-lg"
            src={userContext.avatarURL}
            alt={userContext.firstName}
            />
          <div className="flex flex-1 justify-center items-center mt-4">
            <p className="font-extrabold text-center mx-4">
              {userContext.firstName} {userContext.lastName}
            </p>
            {!userContext.googleUser && (
              <FaEdit
              onClick={() => setEditName(true)}
              className="text-gray-400 cursor-pointer"
              size={20}
              />
              )}
          </div>
          <p className="font-semibold text-seaFoam-500 text-center">
            {userContext.title}
          </p>
        </div>

        {!loading && (
          <Dropzone onDrop={(files) => uploadPhoto(files)}>
            {({ getRootProps, getInputProps }) => (
              <section className="p-10 border-2 border-dashed rounded-lg flex flex-1 justify-center items-center w-full mx-auto">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="font-bold text-gray-500">Drag and Drop or Click Here To Add A Photo!</p>
                </div>
              </section>
            )}
          </Dropzone>
        )}
        {loading && <Loader color="dark" size="lg" variant="dots" />}
        {userContext.avatarPath !== "default-2.png" && (
          <button
          onClick={removePhoto}
          className="text-red-800 hover:underline mt-4 font-semibold cursor-pointer"
          >
            Remove Profile Picture
          </button>
        )}
        {!userContext.googleUser && <button
          onClick={() => setChangePassword(true)}
          className="mt-12 font-semibold text-gray-500 hover:underline"
          >
          Change Your Password
        </button>}
        {userContext.role === 'admin' && <Link href="/admin/admin-dashboard" passHref>
          <p className="font-semibold font-gray-500 cursor-pointer hover:underline">Visit The Admin Dashboard</p>
        </Link>}

        {userContext.googleUser && <p className="text-sm text-center my-4 font-semibold">Your name was provided to us from your Google Account. You can get edit your name in your Google Account settings.</p>}
      </div>
          </SectionHeading>
    </>
  );
};

export default UserProfileCard;
