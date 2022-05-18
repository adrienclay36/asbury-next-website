import React, { useState, useContext } from 'react'
import AsburyButton from '../../../ui/AsburyButton'
import { Textarea, TextInput } from '@mantine/core';
import { supabase } from '../../../../supabase-client';
import { UserContext } from '../../../../store/user-context';
import axios from 'axios';
const NewCommentBox = ({ postID }) => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const userContext = useContext(UserContext);

    const isUser = content.length > 0;
    const notUser = author.length > 0 && content.length > 0;


    const addGuestComment = async () => {
        setLoading(true);
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ipaddress = ipResponse.data.ip;
        const newComment = {
            author: author,
            content: content,
            post_id: postID,
            created_at: new Date(),
            ipaddress: ipaddress,
        }

        const { data, error } = await supabase.from('comments').insert(newComment);
        if(error) {
          console.log("Error adding guest comment:: ", error.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setContent('');
        setAuthor('');
    }

    const addUserComment = async () => {
        setLoading(true);
        const newComment = {
            content: content,
            post_id: postID,
            created_at: new Date(),
            user_id: userContext.user.id,
            author: `${userContext?.firstName} ${userContext?.lastName}`,
            avatar_url: userContext?.avatarURL,
          };
    
          const { data, error } = await supabase.from('comments').insert(newComment);
    
          if(error) {
            console.log("Error adding user comments");
            setLoading(false);
            return;
          }
          setLoading(false);
          setContent('');
          setAuthor('');
    }
    return (
        // <div className="flex flex-1 flex-row justify-between items-center bg-white rounded-full w-11/12 lg:w-2/6 md:w-2/6 mx-auto hover:outline-none active:outline-none h-10 p-8">
        //     <input placeholder="Add A Comment" value={content} onChange={(e) => setContent(e.target.value)} className="flex flex-1  h-10 rounded-full active:outline-none hover:outline-none focus:outline-none border-transparent"/>
        //     <AsburyButton disabled={!content} margin={null} text="Post" loading={loading} />
        // </div>
        <>
            <Textarea
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)}
                className="w-11/12 lg:w-2/6 md:w-3/6 mx-auto"
                placeholder='Add A Comment'
                radius="xl"
                styles={{ input: { padding: 25, }, defaultVariant: { borderWidth: 0, padding: 20 } }} />

            {!userContext?.user && <TextInput value={author} onChange={(e) => setAuthor(e.target.value)} radius="xl" placeholder="Enter Your Name" className="w-11/12 lg:w-2/6 md:w-3/6 mx-auto mt-2" styles={{ input: { padding: 25 }, defaultVariant: { borderWidth: 0, padding: 20 } }} />}

            <div className="flex flex-1 justify-center items-center">
                <AsburyButton onClick={userContext?.user ? addUserComment : addGuestComment} disabled={userContext.user ? (!content) : (!content || !author)} margin={'m-0 w-11/12 lg:w-1/12 md:w-1/12 mt-2'} text="Post" loading={loading} />
            </div>

        </>
    )
}

export default NewCommentBox