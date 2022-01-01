import Dropzone from '../Dropzone';
import { useState } from 'react';
import { useStore } from '../../util/globalStore';
import { useTranslation } from 'react-i18next';
import EXIF from 'exif-js';

export default function UploadScreen() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const { uploadedImages, sortedImagesAsZip, clearUploadedImages } = useStore();
  const { t } = useTranslation();

  async function getExifOfImages(images) {
    const dates = [];
    for (const img of images) {
      const imgArrayBuffer = await img.arrayBuffer();
      const exifData = EXIF.readFromBinaryFile(imgArrayBuffer);
      // Todo: workaround for heic files
      dates.push({ image: img, date: formateExifDate(exifData.DateTimeOriginal) ?? false });
    }

    return dates;
  }
  function formateExifDate(exifDate) {
    if (typeof exifDate === 'undefined') {
      return exifDate;
    }

    const splittedDate = exifDate.split(/[: ]/);
    const date = new Date(splittedDate[0], splittedDate[1], splittedDate[2], splittedDate[3], splittedDate[4], splittedDate[5])
    return date;
  }

  async function sortImages(e) {
    // e.preventDefault();
    setShowLoadingScreen(true);

    // DEBUG;
    console.log(uploadedImages.length);

    const imagesWithExifData = await getExifOfImages(uploadedImages);
    imagesWithExifData.sort((a, b) => {
      if (!a.date) {
        return -1;
      }
      if (!b.date) {
        return 1;
      }
      return a.date - b.date;
    });


    // array of objects with {file, month-year}
    const mappedImages = imagesWithExifData.map((img) => {
      if (!img.date) {
        return { file: img, month: t('folder-unsorted-images') };
      }
      const month = (img.date.getMonth() + 1) + "-" + img.date.getFullYear();
      return { file: img.image, date: img.date, month: month };
    });


    // sort by month
    const sortedByMonth = mappedImages.reduce((result, image) => {
      const alreadySortedImagesForSpecificMonth = result[image.month] || [];

      return {
        ...result,
        [image.month]: [...alreadySortedImagesForSpecificMonth, image]
      }
    }, []);
    console.dir(sortedByMonth);

    // const sortedByYear = {};

    // sort by year
    // for (let prop in sortedByMonth) {
    //   const monthRegex = new RegExp(/[0-9]?[0-9]-[0-9]{4}/, 'g');
    //   if (prop.match(monthRegex)) {
    //     console.log(prop);
    //   }
    // }

    // const sortedByYear = sortedByMonth.reduce((result, month) => {
    //   const alreadySortedImagesForSpecificMonth = result[image.month] || [];

    //   return {
    //     ...result,
    //     [image.month]: [...alreadySortedImagesForSpecificMonth, image]
    //   }
    // }, []);

    setShowLoadingScreen(false);

    // TODO: what should happen after downloading? How are these files going to be sorted into an existing structure? Maybe there's already a folder called 2021. Should I create separate objects for the year containing an array of months?
    // TODO2: What happens if no date is given in the file -> "unsorted"
    // const sortedImages = await window.api.sortImagesByMonth({ images: uploadedImages });
    // console.log(sortedImages.length);

    // debug usage
    // setTimeout(() => {
    //   setShowLoadingScreen(false);
    // }, 3000);
  };

  function downloadImages() {
    console.log('downloadImages');
  }

  const loadingScreen = (
    <div>
      <div className="w-screen h-screen absolute top-0 right-0 bg-gray-300 opacity-80"></div>
      <div className="w-screen h-screen absolute top-0 right-0 opacity-100">
        <div className="flex flex-col justify-center items-center h-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className="font-bold text-lg mt-2">{t('screen-label-loading')}</p>

        </div>
      </div>
    </div>
  );
  return (
    <div className="mx-10 my-5">
      <h2 className="font-bold text-purple-500 text-xl mb-2">{t('upload-title')}</h2>
      <Dropzone className="mb-4" />

      {sortedImagesAsZip == null ?
        <div className="flex justify-between">
          <button onClick={() => sortImages()} type="submit" className="py-2 px-4 border-2 border-purple-500 text-purple-500 font-bold rounded-md hover:bg-purple-100 active:bg-purple-500 active:text-white">{t('button-sort-images')}</button>
          <button onClick={() => clearUploadedImages()} type="submit" className="py-2 px-4 border-2 border-pink-500 text-pink-500 font-bold rounded-md hover:bg-pink-100 active:bg-pink-500 active:text-white">{t('button-clear-upload')}</button>
        </div>
        :
        <div className="flex justify-center">
          <button onClick={() => downloadImages()} type="submit" className="py-2 px-4 border-2 border-purple-500 text-purple-500 font-bold rounded-md hover:bg-purple-100 active:bg-purple-500 active:text-white">{t('button-download-images')}</button>
        </div>
      }
      {showLoadingScreen && loadingScreen}
    </div>
  );
}