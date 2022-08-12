import { useRef, useState } from "react";
import Webcam from "react-webcam";

import "./image-shooter.scss";

const ImageShooterModal = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const videoContraints = {
    width: 300,
    height: 300,
  };

  const handleScreenshot = () => {
    if (!webcamRef.current)  return;

    setImageSrc(webcamRef.current.getScreenshot() as string);
  };

  return (
    <div className="image-shooter">
      <Webcam
        audio={false}
        videoConstraints={videoContraints}
        screenshotFormat="image/webp"
        ref={webcamRef}
      />
      <button
        type="button"
        className="image-shooter__button"
        onClick={handleScreenshot}
      >
        Tirar foto
      </button>
      <img src={imageSrc} alt="" />
    </div>
  );
};

export default ImageShooterModal;
