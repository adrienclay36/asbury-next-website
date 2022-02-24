import React, { useState, useEffect, useCallback } from 'react'
import { downloadImage } from '../supabase-util';
const useGetImage = (avatar_url) => {
    const [avatarURL, setAvatarURL] = useState();
    const [loadingAvatar, setLoadingAvatar] = useState(false);



    const getImage = async () => {
        setLoadingAvatar(true);
      const userImage = await downloadImage("avatars", avatar_url);
      setAvatarURL(userImage);
      setLoadingAvatar(false);
    };

    useEffect(() => {
      getImage();
    }, []);



    return { avatarURL, loadingAvatar }
}

export default useGetImage