import React, { useEffect, useRef, useState } from 'react';
import { MULL_MODEL_URL } from '../../../constants';
import { drawDetectionIcons } from '../../../utilities';
import { TensorflowJsModel } from '../../services/tfjs.model';
import './waste-recognition-page.scss';

/* eslint-disable-next-line */
export interface TrashRecognitionPageProps {}

export function TrashRecognitionPage(props: TrashRecognitionPageProps) {
  const modelRef = useRef<TensorflowJsModel>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>(null);

  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [modelLoading, setModelLoading] = useState<boolean>(true);

  useEffect(() => {
    setup();
    return () => {
      modelRef.current.dispose();
      streamRef.current.getTracks()[0].stop();
    };
  }, []);

  const setupCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let cameraPromise = navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        .then((stream) => {
          streamRef.current = stream;
          videoRef.current.srcObject = stream;

          let { width, height } = stream.getTracks()[0].getSettings();

          videoRef.current.height = height;
          videoRef.current.width = width;
          canvasRef.current.height = height;
          canvasRef.current.width = width;

          videoRef.current.play();

          return new Promise<MediaStream>((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              setVideoLoading(false);
              resolve(stream);
            };
          });
        });
      return cameraPromise;
    }
  };

  const setup = async () => {
    modelRef.current = TensorflowJsModel.getInstance();

    const cameraPromise = setupCamera();
    const modelPromise = modelRef.current.init(MULL_MODEL_URL);

    await Promise.all([cameraPromise, modelPromise]);

    detectFrame(videoRef.current, modelRef.current, canvasRef.current);
  };

  const detectFrame = async (
    video: HTMLVideoElement,
    model: TensorflowJsModel,
    canvas: HTMLCanvasElement
  ) => {
    const results = await model.detect(video, { numResults: 1, threshold: 0.4 });
    if (modelLoading) {
      setModelLoading(false);
    }
    drawDetectionIcons(canvas, results);
    requestAnimationFrame(() => {
      detectFrame(video, model, canvas);
    });
  };

  return (
    <div className="page-container">
      {modelLoading ? (
        <div className="waste-recognition-page-overlay-text">Warming Up Model</div>
      ) : null}
      <video ref={videoRef} className="waste-recognition-page-overlap" />
      <canvas ref={canvasRef} className="waste-recognition-page-overlap" />
    </div>
  );
}

export default TrashRecognitionPage;
