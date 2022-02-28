import RichTextEditor from './RichText';


import React from 'react'

const MantineEditor = ({ content, setContent }) => {
    
  return (
    <RichTextEditor value={content} onChange={setContent}/>
  )
}

export default MantineEditor