import { DetectionResult } from '@mull/types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MULL_MODEL_URL } from '../../../constants';
import { dummyDetectionResults } from '../../../mockdata';
import { canvasToImageCoords, coordsInBox, drawDetectionIcons } from '../../../utilities';
import { useToast } from '../../hooks/useToast';
import { TensorflowJsModel } from '../../services/tfjs.model';
import IdentifiedWasteModal from './identified-waste-modal';
import './waste-recognition-page.scss';

/* eslint-disable-next-line */
export interface WasteRecognitionPageProps {}

export function WasteRecognitionPage(props: WasteRecognitionPageProps) {
  const modelRef = useRef<TensorflowJsModel>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // This hidden canvas is used to render specific objects when the user clicks on an icon
  const hiddenCanvas = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>(null);
  const resultRef = useRef<DetectionResult[]>([]);
  const { notifyToast } = useToast();

  const [modelLoading, setModelLoading] = useState<boolean>(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetectionResult, setModalDetectionResult] = useState<DetectionResult>(
    dummyDetectionResults[0]
  );
  const [modalImageURL, setModalImageURL] = useState<string>('no-image');

  useEffect(() => {
    setup();

    return () => {
      shutdown();
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  /**
   * Set up model, camera, listeners and other resources for the waste recognition page
   */
  const setup = async () => {
    canvasRef.current.addEventListener('click', onCanvasClick);

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

  const setupCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices
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
              resolve(stream);
            };
          });
        });
    } else {
      throw new Error(
        'Either no camera exists on your device, or your browser denied access to it'
      );
    }
  };

  /**
   * Shutdown and dispose of page resources, such as the camera, model and listeners
   */
  const shutdown = () => {
    canvasRef.current.removeEventListener('click', onCanvasClick);
    modelRef.current.dispose();
    if (streamRef.current && streamRef.current.getTracks().length > 0) {
      streamRef.current.getTracks()[0].stop();
    }
  };

  const detectFrame = async (
    video: HTMLVideoElement,
    model: TensorflowJsModel,
    canvas: HTMLCanvasElement
  ) => {
    // TODO adjust numResults/threshold to filter out bad results better. Might need to be dynamic
    resultRef.current = await model.detect(video, { numResults: 10, threshold: 0.6 });
    if (modelLoading) {
      setModelLoading(false);
    }
    drawDetectionIcons(canvas, resultRef.current);
    requestAnimationFrame(() => {
      detectFrame(video, model, canvas);
    });
  };

  const onCanvasClick = (event: MouseEvent) => {
    const canvasCoords = {
      x: event.offsetX,
      y: event.offsetY,
    };
    const canvasSize = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    };
    const imageSize = {
      width: canvasRef.current.width,
      height: canvasRef.current.height,
    };
    const imageCoords = canvasToImageCoords(canvasCoords, canvasSize, imageSize);

    const clickedObjects = resultRef.current.filter((result) =>
      coordsInBox(imageCoords, result.bndBox)
    );

    if (clickedObjects.length > 0) {
      // Since results are ordered by confidence, we should take the first result to be the one the user wanted to click
      const clickedObject = clickedObjects[0];

      setModalDetectionResult(clickedObject);
      setModalImageURL(getImageURL(clickedObject));
      setModalOpen(true);
    }
  };

  const getImageURL = (detectionResult: DetectionResult) => {
    const box = detectionResult.bndBox;
    const canvas = hiddenCanvas.current;
    const ctx = canvas.getContext('2d');

    canvas.width = videoRef.current.width;
    canvas.height = videoRef.current.height;
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = ctx.getImageData(box.x, box.y, box.width, box.height);

    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
  };

  return (
    <div className="page-container">
      <IdentifiedWasteModal
        imageSrc={modalImageURL}
        detectionResult={modalDetectionResult}
        open={modalOpen}
        setOpen={setModalOpen}
      />
      {modelLoading ? (
        <div className="waste-recognition-page-overlay-text">Warming up the Detection Model</div>
      ) : null}
      <video
        ref={videoRef}
        className="waste-recognition-page-overlap"
        data-testid="waste-recognition-page-video"
      />
      <canvas ref={canvasRef} className="waste-recognition-page-overlap" />
      <canvas ref={hiddenCanvas} hidden={true} />
    </div>
  );
}

export default WasteRecognitionPage;
