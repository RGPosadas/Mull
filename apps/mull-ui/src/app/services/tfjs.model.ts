import { BoundingBox, DetectionResult } from '@mull/types';
import * as tf from '@tensorflow/tfjs';
import { GraphModel, Tensor3D } from '@tensorflow/tfjs';
import { labelMap } from './maps';
export interface WasteRecognitionModel {
  init(modelUrl: string): Promise<void>;
  detect(
    input: Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options?: DetectionOptions
  ): Promise<DetectionResult[]>;
  dispose(): void;
}

export class TensorflowJsModel implements WasteRecognitionModel {
  private constructor() {}
  model: GraphModel;

  private static instance: TensorflowJsModel;

  static getInstance() {
    if (!this.instance) {
      this.instance = new TensorflowJsModel();
    }
    return this.instance;
  }

  async init(modelUrl: string): Promise<void> {
    this.model = await tf.loadGraphModel(modelUrl);
  }
  async detect(
    input: Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options: DetectionOptions = { numResults: 20, threshold: 0.5 }
  ): Promise<DetectionResult[]> {
    const batched = tf.tidy(() => {
      if (!(input instanceof tf.Tensor)) {
        input = tf.browser.fromPixels(input);
      }
      // Reshape to a single-element batch so we can pass it to executeAsync.
      return tf.expandDims(input);
    });

    const imageHeight = batched.shape[1];
    const imageWidth = batched.shape[2];

    /*
      executeAsync will return an array of 8 Tensors, which are the following.
      An asterick indicates that the info is useful to us
      
      index   name                        shape
      0       detection_anchor_indices    [1, 100]
      1*      num_detections              [1]
      2       raw_detection_scores        [1 1917 5]
      3*      detection_scores            [1 100]
      4*      detection_classes           [1 100]
      5       detection_multiclass_scores [1 100 5]
      6       raw_detection_boxes         [1 1917 4]
      7*      detection_boxes             [1 100 4]
     */

    let modelOutput = (await this.model.executeAsync(batched)) as tf.Tensor[];

    let numDetections = (await modelOutput[1].data())[0] as number;
    const scores = await modelOutput[3].data();
    const classes = await modelOutput[4].data();
    // 1D array with 4 * N elements. bounds are ordered as ymin, xmin, ymax, xmax
    const boxes = await modelOutput[7].data();
    console.log({ numDetections, scores, classes, boxes });
    let detectionResults: DetectionResult[] = [];

    if (options.numResults < numDetections) {
      numDetections = options.numResults;
    }

    for (let i = 0; i < numDetections; i++) {
      if (scores[i] < options.threshold) {
        // Results from this point forward will be below threshold, processing complete
        break;
      }

      let [ymin, xmin, ymax, xmax] = boxes.slice(i * 4, (i + 1) * 4);
      let bndBox: BoundingBox = {
        x: xmin * imageWidth,
        y: ymin * imageHeight,
        width: (xmax - xmin) * imageWidth,
        height: (ymax - ymin) * imageHeight,
      };
      let clazz = labelMap[classes[i]];
      detectionResults.push({ bndBox, class: clazz, confidence: scores[i] });
    }

    return detectionResults;
  }
  dispose(): void {
    throw new Error('Method not implemented.');
  }
}

export interface DetectionOptions {
  numResults: number;
  threshold: number;
}
