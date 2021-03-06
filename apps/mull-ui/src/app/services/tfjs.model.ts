import { BoundingBox, DetectionResult, wasteClasses } from '@mull/types';
import * as tf from '@tensorflow/tfjs';
import { GraphModel, Tensor3D } from '@tensorflow/tfjs';
export interface WasteRecognitionModel {
  init(modelUrl: string): Promise<void>;
  detect(
    input: Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options?: DetectionOptions
  ): Promise<DetectionResult[]>;
  dispose(): void;
}

export class TensorflowJsModel implements WasteRecognitionModel {
  private constructor() {
    // Private constructor for Singleton
    this.model = null;
  }
  model: GraphModel;

  private static instance: TensorflowJsModel;

  private detecting = false;
  private toDispose = false;

  static getInstance() {
    if (!this.instance) {
      this.instance = new TensorflowJsModel();
    }
    return this.instance;
  }

  async init(modelUrl: string): Promise<void> {
    if (!this.model) {
      this.model = await tf.loadGraphModel(modelUrl);
    }
  }
  async detect(
    input: Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options: DetectionOptions = { numResults: 20, threshold: 0.5 }
  ): Promise<DetectionResult[]> {
    if (!this.model) {
      return [];
    }
    this.detecting = true;

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
      
      output_node_name    name                          shape
      Identity:0          detection_anchor_indices      [1, 100]
      Identity_1:0*       detection_boxes               [1 100 4]
      Identity_2:0*       detection_classes             [1 100]
      Identity_3:0        detection_multiclass_scores   [1 100 5]
      Identity_4:0*       detection_scores              [1 100]
      Identity_5:0*       num_detections                [1]
      Identity_6:0        raw_detection_boxes           [1 1917 4]
      Identity_7:0        raw_detection_scores          [1 1917 5]
     */

    const modelOutput = (await this.model.executeAsync(batched, [
      'Identity_1:0',
      'Identity_2:0',
      'Identity_4:0',
      'Identity_5:0',
    ])) as tf.Tensor[];

    // 1D array with 4 * N elements. bounds are ordered as ymin, xmin, ymax, xmax
    const boxes = await modelOutput[0].data();
    const classes = await modelOutput[1].data();
    const scores = await modelOutput[2].data();
    let numDetections = (await modelOutput[3].data())[0];

    const detectionResults: DetectionResult[] = [];

    if (options.numResults < numDetections) {
      numDetections = options.numResults;
    }

    for (let i = 0; i < numDetections; i++) {
      if (scores[i] < options.threshold) {
        // Results from this point forward will be below threshold, processing complete
        break;
      }

      const [ymin, xmin, ymax, xmax] = boxes.slice(i * 4, (i + 1) * 4);
      const bndBox: BoundingBox = {
        x: xmin * imageWidth,
        y: ymin * imageHeight,
        width: (xmax - xmin) * imageWidth,
        height: (ymax - ymin) * imageHeight,
      };
      const clazz = wasteClasses[Math.round(classes[i] - 1)];
      detectionResults.push({ bndBox, class: clazz, confidence: scores[i] });
    }

    // clean the tensors
    batched.dispose();
    tf.dispose(modelOutput);

    this.detecting = false;

    if (this.toDispose) {
      this.dispose();
    }
    return detectionResults;
  }

  dispose(): void {
    if (this.model && !this.detecting) {
      try {
        this.model.dispose();
        this.model = null;
      } catch {
        //ignore
      }
      this.model = null;
    } else if (this.model && this.detecting) {
      this.toDispose = true; // Let the detect() method dispose after it's done
    }
  }
}

export interface DetectionOptions {
  numResults: number;
  threshold: number;
}
