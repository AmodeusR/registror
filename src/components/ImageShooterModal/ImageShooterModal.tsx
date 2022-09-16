import { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import DataContext from "../../contexts/data.context";
import { createBlob } from "../../utils/createBlob";
import { fetchFirestoreData, updateGuestPicture, uploadUserPicture } from "../../utils/firebase";
import { GuestCardProps } from "../Cards/cards.types";
import "./image-shooter.scss";


interface ImageShooterModalProps {
  cpf: number;
  setImageSrc: (imgSrc: string) => void;
}

const ImageShooterModal = ({ cpf, setImageSrc }: ImageShooterModalProps) => {
  const { fetchedData, setFetchedData } = useContext(DataContext);
  const webcamRef = useRef<Webcam>(null);

  const videoContraints = {
    width: 300,
    height: 300,
  };

  const handleScreenshot = async () => {
    if (!webcamRef.current)  return;

    const imgBase64 = webcamRef.current.getScreenshot();
    if (imgBase64) {
      setImageSrc(imgBase64);
    }

    if (imgBase64) {
      const blobImage = await createBlob(imgBase64);
      
      const userPictureLink = await uploadUserPicture({
        img: blobImage,
        userID: cpf
      });
      
      const guestToUpdate = fetchedData["guests"].filter((guest: GuestCardProps) => guest.cpf === cpf);
      const updatedGuest = {...guestToUpdate[0], guestPicture: userPictureLink as string};
      
      await updateGuestPicture(updatedGuest);
      
      const updatedData = await fetchFirestoreData();

      if (!updatedData) return;
      setFetchedData(updatedData);
    }
    
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
    </div>
  );
};

export default ImageShooterModal;
