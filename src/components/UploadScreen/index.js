import Dropzone from '../Dropzone';

export default function UploadScreen() {
  return (
    <div className="mx-10 my-5">
      <h2 className="font-bold text-purple-500 text-xl mb-2">Upload your directory here</h2>
      <Dropzone />
    </div>
  );
}