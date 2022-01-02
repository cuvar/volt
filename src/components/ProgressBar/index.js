import { useState, useEffect } from 'react';

export default function ProgressBar(props) {

  const [progress, setProgress] = useState(props.progress || 0);


  if (progress > 100) {
    setProgress(100);
  }
  else if (progress < 0) {
    setProgress(0);
  }

  return (
    <div className={"w-100 h-8 bg-gray-300 rounded-md mt-4 mb-8" + ' ' + props.className} >
      <div className="relative top-0 progress-bar bg-purple-500 h-full rounded-md" role="progressbar" style={{ width: `${progress}%` }}></div>
    </div >
  );
}