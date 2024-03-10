import * as faceapi from "face-api.js";
import React, { useState, useRef, useEffect } from "react";

const EmotionAssessment: React.FC = () => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    const interval = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const displaySize = { width: videoWidth, height: videoHeight };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const context = canvasRef.current.getContext("2d");

        if (context) {
          context.clearRect(0, 0, videoWidth, videoHeight);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          // Removed drawFaceLandmarks to avoid drawing landmarks on the face
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const closeWebcam = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      (video.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      video.pause();
      setCaptureVideo(false);
    }
  };

  return (
    <div>
      <h2 className="mb-3 p-8 text-center font-bold underline underline-offset-8 decoration-blue-400 text-3xl">
        {" "}
        Emotion Detection
      </h2>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-4">
          {captureVideo && modelsLoaded ? (
            <button
              onClick={closeWebcam}
              className="bg-purple-300 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-purple-400"
            >
              Close Webcam
            </button>
          ) : (
            <button
              onClick={startVideo}
              className="bg-purple-300 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-purple-400"
            >
              Open Webcam
            </button>
          )}
        </div>
        {captureVideo && modelsLoaded && (
          <div className="relative">
            <video
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              onPlay={handleVideoOnPlay}
              className="rounded-xl shadow-lg"
            />
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
          </div>
        )}
        <div className="mt-4">
          <button className="bg-blue-300 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-blue-400">
            Proceed to Sign Language Detection
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotionAssessment;
