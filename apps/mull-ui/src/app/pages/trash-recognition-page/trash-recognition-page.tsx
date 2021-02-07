import React, { useEffect, useRef } from 'react';
import { TensorflowJsModel } from '../../services/tfjs.model';
import './trash-recognition-page.scss';

/* eslint-disable-next-line */
export interface TrashRecognitionPageProps {}

const modelUrl = 'https://raw.githubusercontent.com/TheGreatMarkus/mull-model/main/tfjs/model.json';

export function TrashRecognitionPage(props: TrashRecognitionPageProps) {
  let model: TensorflowJsModel;
  let canvasRef = useRef<HTMLCanvasElement>(null);
  let imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    model = TensorflowJsModel.getInstance();
    model.init(modelUrl);
    imgRef.current.setAttribute('crossOrigin', 'anonymous');
  }, []);

  const handleOnClick = () => {
    model.detect(imgRef.current, { threshold: 0.3, numResults: 100 }).then((results) => {
      console.log(results);
      let ctx = canvasRef.current.getContext('2d');
      ctx.strokeStyle = '#00ff00';
      results.map((result) => {
        let box = result.bndBox;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        ctx.strokeText(result.class, box.x, box.y);
      });
    });
  };

  return (
    <div className="page-container">
      <h1>Welcome to trash-recognition-page!</h1>
      <img
        ref={imgRef}
        src="https://i.imgur.com/f4Pk5Mo.jpg"
        width={500}
        height={330}
        className="trash-recognition-overlap"
      />
      <canvas ref={canvasRef} width={500} height={330} className="trash-recognition-overlap" />
      <button onClick={handleOnClick}>Click me to detect!</button>
    </div>
  );
}

export default TrashRecognitionPage;
