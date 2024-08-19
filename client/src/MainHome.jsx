// src/MainHome.jsx
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './MainHome.css';

const MainHome = () => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const handleScanClick = () => {
    setIsCameraOpen(true); // Open the camera
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCameraOpen(false);
    setImageUploaded(true);
  };

  const handleDiscard = () => {
    setCapturedImage(null);
    setImageUploaded(false);
  };

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
      setCapturedImage(URL.createObjectURL(file));
      setImageUploaded(true);
    }
  };

  const handleFindDiseaseClick = () => {
    console.log("Finding disease...");
    // Show toast message
    alert("Image successfully uploaded for disease detection.");
    // Add further logic for disease prediction
  };

  return (
    <div className="main-home-container">
      <h1>Crop Disease Prediction and Management System</h1>
      <p>
        Upload or scan an image of your crop, and we will help you detect any potential diseases.
      </p>
      <div className="button-container">
        <button className="scan-button" onClick={handleScanClick}>
          Scan Image
        </button>
        <input
          type="file"
          accept="image/*"
          className="upload-input"
          onChange={handleUploadChange}
        />
      </div>
      {isCameraOpen && (
        <div className="camera-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <button className="capture-button" onClick={handleCapture}>
            Capture
          </button>
        </div>
      )}
      {capturedImage && (
        <div className="captured-image-container">
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured Crop" />
          <div className="image-action-buttons">
            <button className="find-disease-button" onClick={handleFindDiseaseClick}>
              Find Disease
            </button>
            <button className="discard-button" onClick={handleDiscard}>
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHome;
