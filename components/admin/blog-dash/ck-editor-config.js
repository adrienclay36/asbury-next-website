import React, { useState, useEffect, useRef } from 'react'

import { Skeleton } from '@mantine/core'

const editorConfig = {
    mediaEmbed: {
        previewsInData: true,
    }
}
export default function CKEditorConfig ({ content, setContent }) {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {

      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, 
      ClassicEditor: require('../../../CustomCKEditor/build/ckeditor')
    }
    setEditorLoaded(true)
  }, [])

  return editorLoaded ? (
    <CKEditor
    config={editorConfig}
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
        console.log(data);
      }}
    />
  ) : (
    <>
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
    </>
  );
}