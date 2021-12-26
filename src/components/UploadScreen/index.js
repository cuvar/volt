import Dropzone from '../Dropzone';
import { useState } from 'react';
import { useStore } from '../../util/globalStore';

export default function UploadScreen() {

  const [customText, setCustomText] = useState("Hello");
  const { uploadedImages, clearUploadedImages } = useStore();

  const formHandler = async (e) => {
    // e.preventDefault();
    console.log(uploadedImages.length);

    // const tttteeext = await window.api.getCustomText({ username: "hello" });
    // setCustomText(tttteeext);
    // console.log(tttteeext);
  };

  return (
    <div className="mx-10 my-5">
      <h2 className="font-bold text-purple-500 text-xl mb-2">Upload your folder here</h2>
      <Dropzone className="mb-4" />
      <div className="flex justify-between">
        <button onClick={() => formHandler()} type="submit" className="py-2 px-4 border-2 border-purple-500 text-purple-500 font-bold rounded-md hover:bg-purple-100 active:bg-purple-500 active:text-white">Sort images</button>
        <button onClick={() => clearUploadedImages()} type="submit" className="py-2 px-4 border-2 border-pink-500 text-pink-500 font-bold rounded-md hover:bg-pink-100 active:bg-pink-500 active:text-white">Clear upload</button>
      </div>
    </div>
  );
}