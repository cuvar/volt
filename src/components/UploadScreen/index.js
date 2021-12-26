import Dropzone from '../Dropzone';
import { useState } from 'react';
import { useStore } from '../../util/globalStore';
import { useTranslation } from 'react-i18next';

export default function UploadScreen() {

  const { uploadedImages, sortedImagesAsZip, clearUploadedImages } = useStore();
  const { t } = useTranslation();

  const formHandler = async (e) => {
    // e.preventDefault();
    console.log(uploadedImages.length);
    // const tttteeext = await window.api.getCustomText({ username: "hello" });
    // console.log(tttteeext);
  };

  function downloadImages() {
    console.log('downloadImages');
  }

  return (
    <div className="mx-10 my-5">
      <h2 className="font-bold text-purple-500 text-xl mb-2">{t('upload-title')}</h2>
      <Dropzone className="mb-4" />

      {sortedImagesAsZip == null ?
        <div className="flex justify-between">
          <button onClick={() => formHandler()} type="submit" className="py-2 px-4 border-2 border-purple-500 text-purple-500 font-bold rounded-md hover:bg-purple-100 active:bg-purple-500 active:text-white">{t('button-sort-images')}</button>
          <button onClick={() => clearUploadedImages()} type="submit" className="py-2 px-4 border-2 border-pink-500 text-pink-500 font-bold rounded-md hover:bg-pink-100 active:bg-pink-500 active:text-white">{t('button-clear-upload')}</button>
        </div>
        :
        <div className="flex justify-center">
          <button onClick={() => downloadImages()} type="submit" className="py-2 px-4 border-2 border-purple-500 text-purple-500 font-bold rounded-md hover:bg-purple-100 active:bg-purple-500 active:text-white">{t('button-download-images')}</button>
        </div>
      }
    </div>
  );
}