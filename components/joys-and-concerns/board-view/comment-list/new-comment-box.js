import React, { useState } from 'react'
import AsburyButton from '../../../ui/AsburyButton'
import { Textarea } from '@mantine/core';
const NewCommentBox = ({ postID }) => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
  return (
    <div className="flex flex-1 flex-row justify-between items-center bg-white rounded-full w-11/12 lg:w-2/6 md:w-2/6 mx-auto hover:outline-none active:outline-none h-10 p-8">
        <input placeholder="Add A Comment" value={content} onChange={(e) => setContent(e.target.value)} className="flex flex-1  h-10 rounded-full active:outline-none hover:outline-none focus:outline-none border-transparent"/>
        <AsburyButton disabled={!content} margin={null} text="Post" loading={loading} />
    </div>
  )
}

export default NewCommentBox