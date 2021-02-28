import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MULL_MODEL_URL } from '../../../constants';
import { drawDetectionIcons } from '../../../utilities';
import { useToast } from '../../hooks/useToast';
import { TensorflowJsModel } from '../../services/tfjs.model';
import './waste-recognition-page.scss';

/* eslint-disable-next-line */
export interface WasteRecognitionPageProps {}

export function WasteRecognitionPage(props: WasteRecognitionPageProps) {
  const modelRef = useRef<TensorflowJsModel>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const { notifyToast, updateToast } = useToast();

  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [modelLoading, setModelLoading] = useState<boolean>(true);

  useEffect(() => {
    setup();
    return () => {
      modelRef.current.dispose();
      if (streamRef.current && streamRef.current.getTracks().length > 0) {
        streamRef.current.getTracks()[0].stop();
      }
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const setupCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const cameraPromise = navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        .then((stream) => {
          streamRef.current = stream;
          videoRef.current.srcObject = stream;

          const { width, height } = stream.getTracks()[0].getSettings();

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
    } else {
      throw new Error(
        'Either no camera exists on your device, or your browser denied access to it'
      );
    }
  };

  const setup = async () => {
    modelRef.current = TensorflowJsModel.getInstance();

    try {
      await setupCamera();
    } catch (err) {
      if (err instanceof DOMException) {
        notifyToast(`Permission to access the camera was denied`, toast.TYPE.ERROR);
      } else if (err instanceof Error) {
        notifyToast(`${err.message}`, toast.TYPE.ERROR);
      } else {
        notifyToast(err, toast.TYPE.ERROR);
      }
      return;
    }

    try {
      await modelRef.current.init(MULL_MODEL_URL);
    } catch {
      notifyToast('Detection model loading failed', toast.TYPE.ERROR);
      setModelLoading(false);
      return;
    }

    detectFrame(videoRef.current, modelRef.current, canvasRef.current);
  };

  const detectFrame = async (
    video: HTMLVideoElement,
    model: TensorflowJsModel,
    canvas: HTMLCanvasElement
  ) => {
    // TODO adjust numResults/threshold to filter out bad results better. Might need to be dynamic
    const results = await model.detect(video, { numResults: 10, threshold: 0.45 });
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
        <div className="waste-recognition-page-overlay-text">Warming up the Detection Model</div>
      ) : null}
      <video
        ref={videoRef}
        className="waste-recognition-page-overlap"
        data-testid="waste-recognition-page-video"
      />
      <canvas ref={canvasRef} className="waste-recognition-page-overlap" />
    </div>
  );
}

export default WasteRecognitionPage;
