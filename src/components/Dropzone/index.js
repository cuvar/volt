import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from '../../util/globalStore';

export default function Dropzone(props) {
  const { uploadedImages, setUploadedImages } = useStore();

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles.length);
    setUploadedImages(acceptedFiles);

  }, [])
  const imgPreview = (
    <div className='w-full flex flex-col items-center justify-center'>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
      </svg>
    </div>
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const DISPLAY_TEXT = "Drag 'n' drop some files here, or click to select files";

  return (
    <div {...getRootProps()} className={"px-5 py-10 border-2 border-dashed border-purple-400 rounded-md" + ' ' + props.className}>
      <input {...getInputProps()} />
      <p className="text-center">{uploadedImages.length > 0 ? imgPreview : DISPLAY_TEXT}</p>
    </div>
  )
}