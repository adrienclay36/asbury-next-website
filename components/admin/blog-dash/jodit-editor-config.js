import React from 'react'
import dynamic from "next/dynamic";

const importJodit = () => import("jodit-react");

const joditConfig = {
  triggerChangeEvent: true,
  enableDragAndDropFileToEditor: true,
  removeButtons: [
    "table",
    "fullsize",
    "highlight",
    "font",
    "fontsize",
    "fillColor",
  ],
};

const JoditEditor = dynamic(importJodit, { ssr: false });

const JoditEditorConfig = ({ content, setContent }) => {
  return (
    <JoditEditor
      config={joditConfig}
      value={content}
      onBlur={(newContent) => setContent(newContent)}
    />
  );
}

export default JoditEditorConfig