import React, { useEffect, useRef } from 'react';
import { MULL_MODEL_URL } from '../../../constants';
import { drawDetectionIcons } from '../../../utilities';
import { TensorflowJsModel } from '../../services/tfjs.model';
import './trash-recognition-page.scss';

/* eslint-disable-next-line */
export interface TrashRecognitionPageProps {}

export function TrashRecognitionPage(props: TrashRecognitionPageProps) {
  const model = useRef<TensorflowJsModel>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const width = 500;
  const height = 667;

  useEffect(() => {
    model.current = TensorflowJsModel.getInstance();
    model.current.init(MULL_MODEL_URL);
    imgRef.current.setAttribute('crossOrigin', 'anonymous');
  }, []);

  const handleOnClick = async () => {
    const results = await model.current.detect(imgRef.current, {
      threshold: 0.45,
      numResults: 100,
    });
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawDetectionIcons(ctx, results);
  };

  return (
    <div className="page-container">
      <h1>Welcome to trash-recognition-page!</h1>
      <img
        alt="Test"
        ref={imgRef}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Apple_pie.jpg/1200px-Apple_pie.jpg"
        width={width}
        className="trash-recognition-overlap"
      />
      <canvas ref={canvasRef} width={width} height={height} className="trash-recognition-overlap" />
      <button data-testid="temp-trash-recog-page-button" onClick={handleOnClick}>
        Click me to detect!
      </button>
    </div>
  );
}

export default TrashRecognitionPage;
