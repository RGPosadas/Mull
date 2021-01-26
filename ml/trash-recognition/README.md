# Object Detection with Tensorflow

- [Object Detection with Tensorflow](#object-detection-with-tensorflow)
  - [Folder structure](#folder-structure)
  - [Setup](#setup)
  - [Training](#training)
    - [Training Commands](#training-commands)
    - [Generate TF Records](#generate-tf-records)
    - [Train Model](#train-model)
    - [Export Model as a SavelModel](#export-model-as-a-savelmodel)
    - [Convert Model to TFJS Graph Model](#convert-model-to-tfjs-graph-model)
  - [External Links](#external-links)
  - [Troubleshooting](#troubleshooting)
    - [Memory Issues during Training](#memory-issues-during-training)

This README will walk you through how to train a model for the Mull project. The structure and instructions are based on the [Tensorflow Object Detection API Tutorial](https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/index.html).

Here are some notes about the guide:

- It was successfully done on Linux, but with slight adjustments it might work with Windows or Mac too.
- Note that there is limited support for Macs when it comes to training on a GPU, so training the model might be very slow on that platform

## Folder structure

This directory is split into the following files and folders:

- `images`: This folder contains our training and testing data.
- `annotations`: This folders contains `label_map.pbtxt` which explain what categories, or "classes" of objects our model will be able to recognize. It will also contain TF Records, which are big binary files that contain processed training/testing data.
- `pre-trained-models`: This folder contains [preexisting models](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md) whose configuration is reused to train our custom models.
- `models`: This folder contains the custom models we are training. These folders will contains a `pipeline.config` file, which contains all of the config related to how the model will be trained.
- `exported-models`: This folder contains final, trained models which have been exported/saved in the [SavedModel](https://www.tensorflow.org/guide/saved_model) format.
- `converted-models`: This folder contains final models which have been converted into a format that can run with [Tensorflow JS](https://www.tensorflow.org/js).
- `test-model.ipynb`: This file is a [Jupyter Notebook](https://jupyter.org/) meant to allow you to test a model after it has been trained and exported
- And then there are various python scripts which have documentation at the top of the file.

## Setup

First follow the installation instructions at: <https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/install.html>

Important Notes:

- For GPU support, if you are currently using an Ampere Nvidia GPU (RTX 3000 series), the version of dependencies in the guide won't work for you. Ampere cards require CUDA toolkit 11, which means you need to use Tensorflow 2.4 and above. The latest versions available were used successfully, as of 2021-01-24, so doing the same should work in your situation:
  - Latest Tensorflow (2.4.0)
  - Latest CUDA Toolkit (11.2)
  - Latest CuDNN for CUDA 11.2 (8.0.5.39)

## Training

Follow the instructions at: <https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/training.html>

Notes:

- Instead of manually labelling data, you can also download data using this tool: <https://pypi.org/project/openimages/>. You will then need to use the `fix-openimages-data.py` and `split-data.py` scripts to get the data in the right shape.

### Training Commands

Here are a list of commands to run during training, already modified to work correctly for our project's custom file structure. All these commands are meant to be run from this root directory (trash-recognition). For the scripts `model_main_tf2.py` and `exporter_main_v2.py`, download them from [here](https://github.com/tensorflow/models/tree/master/research/object_detection)

### Generate TF Records

```bash
# Generate records for training and testing data
python generate_tfrecord.py -i images -l annotations/label_map.pbtxt -o annotations
```

### Train Model

To make things simpler when dealing with multiple models, set the `MODEL_NAME` env. variable, which is the name of the folder for your model, under the `models/` folder.

```bash
# Run this to train the model, where
python model_main_tf2.py --model_dir=models/$MODEL_NAME --pipeline_config_path=models/$MODEL_NAME/pipeline.config

# Run this in parallel in another terminal, to get validation
python model_main_tf2.py --model_dir=models/$MODEL_NAME --pipeline_config_path=models/$MODEL_NAME/pipeline.config --checkpoint_dir=models/$MODEL_NAME

# Run this in parallel in another terminal, to get an interactive board to monitor training.
tensorboard --logdir models/$MODEL_NAME
```

### Export Model as a SavelModel

This command will export the trained model into the SavedModel format, which can then be used for predictions.

```bash
python exporter_main_v2.py \
--input_type image_tensor \
--pipeline_config_path models/$MODEL_NAME/pipeline.config \
--trained_checkpoint_dir models/$MODEL_NAME \
--output_directory exported-models/$MODEL_NAME
```

### Convert Model to TFJS Graph Model

This command will convert an exported model into a TensorflowJS (TFJS) Graph Model, which can be loaded into the browser using Tensorflow JS.

```bash
tensorflowjs_converter \
 --input_format=tf_saved_model \
 --output_format=tfjs_graph_model \
 --signature_name=serving_default \
 --saved_model_tags=serve \
 exported-models/$MODEL_NAME/saved_model \
 converted-models/$MODEL_NAME
```

## External Links

I have made the models that I trained available at [TheGreatMarkus/mull-model](https://github.com/TheGreatMarkus/mull-model) if you're interested in playing around with them.

Also, we have [a OneDrive folder](https://liveconcordia-my.sharepoint.com/:f:/g/personal/c_aldea_live_concordia_ca/Evd3mpAYFE1MjbhUcxKisUQBRz2IVUegTL8FdK0yFa3ztg?e=XB4G2V) used as the repository for all of our training data. Password is on Slack.

## Troubleshooting

### Memory Issues during Training

When training a model on a GPU, you need a lot of memory for things to go smoothly. If your GPU doesn't have enough memory, Tensorflow may crash. To fix this, try allowing memory growth by adding the following snippet to the top of the `main` method in `model_main_tf2.py`.

```python
  # Enable GPU dynamic memory allocation
  gpus = tf.config.experimental.list_physical_devices('GPU')
  for gpu in gpus:
      tf.config.experimental.set_memory_growth(gpu, True)
```
