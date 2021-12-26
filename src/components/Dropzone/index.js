import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from '../../util/globalStore';

export default function Dropzone() {
  const { uploadedImages, setUploadedImages, clearUploadedImages } = useStore();

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles.length);
    setUploadedImages(acceptedFiles);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  let displayText = isDragActive ? "Drop the files here" : "Drag 'n' drop some files here, or click to select files";

  return (
    <div {...getRootProps()} className="px-5 py-10 border-2 border-dashed border-purple-400 rounded-md">
      <input {...getInputProps()} />
      <p className="text-center">{uploadedImages.length > 0 ? "Hello world" : displayText}</p>
    </div>
  )
}