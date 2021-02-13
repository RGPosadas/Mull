import React, { useEffect, useRef, useState } from 'react';
import { MULL_MODEL_URL } from '../../../constants';
import { drawDetectionIcons } from '../../../utilities';
import { TensorflowJsModel } from '../../services/tfjs.model';
import './trash-recognition-page.scss';

/* eslint-disable-next-line */
export interface TrashRecognitionPageProps {}

export function TrashRecognitionPage(props: TrashRecognitionPageProps) {
  const modelRef = useRef<TensorflowJsModel>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [modelLoading, setModelLoading] = useState<boolean>(true);

  useEffect(() => {
    setup();
  }, []);

  const setupCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let cameraPromise = navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        })
        .then((stream) => {
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
    drawDetectionIcons(canvas, results, true);
    requestAnimationFrame(() => {
      detectFrame(video, model, canvas);
    });
  };

  return (
    <div className="page-container">
      <h1>Welcome to trash-recognition-page!</h1>
      {videoLoading ? <div> Loading Video Feed</div> : null}
      {modelLoading ? <div> Loading Model</div> : null}
      <video
        ref={videoRef}
        src="https://farm4.staticflickr.com/7372/9303908257_374934b32f_o.jpg"
        className="trash-recognition-overlap"
      />

      <canvas ref={canvasRef} className="trash-recognition-overlap" />
    </div>
  );
}

export default TrashRecognitionPage;
