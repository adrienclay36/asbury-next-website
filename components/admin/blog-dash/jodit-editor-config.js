import React from 'react'
import dynamic from "next/dynamic";

const importJodit = () => import("jodit-react");

const joditConfig = {
  removeButtons: [
    "table",
    "fullsize",
    "highlight",
    "font",
  ],
};

const JoditEditor = dynamic(importJodit, { ssr: false });

const JoditEditorConfig = ({ content, setContent }) => {
  const handleChange = (newContent) => {
    setContent(newContent);
    console.log(newContent.slice(0,100) + "...");
  }
  return (
    <JoditEditor
      config={joditConfig}
      value={content}
      onBlur={(newContent) => handleChange(newContent)}
    />
  );
}

export default JoditEditorConfig