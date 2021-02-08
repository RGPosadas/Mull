import React, { useEffect, useRef } from 'react';
import { MULL_MODEL_URL } from '../../../constants';
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
    ctx.strokeStyle = '#00ff00';
    results.forEach((result) => {
      const box = result.bndBox;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      ctx.strokeText(result.class, box.x, box.y);
    });
  };

  return (
    <div className="page-container">
      <h1>Welcome to trash-recognition-page!</h1>
      <img
        alt="Test"
        ref={imgRef}
        src="https://farm4.staticflickr.com/7372/9303908257_374934b32f_o.jpg"
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
