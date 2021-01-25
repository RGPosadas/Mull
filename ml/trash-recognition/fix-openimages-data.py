# This script takes data downloaded using this tool: https://pypi.org/project/openimages/
# and moves the images and XMLs into the common "class" folder.
#
# Example:
#
# Before:
# - apple (a class of objects)
#    - images (contains all image files)
#    - pascal (contains all XML files)
# - banana (another class of objects)
#    - images
#    - pascal
#
# After:
# - apple (contains all image and xml files)
# - banana (contains all image and xml files)
#
# This is done since the resulting file structure is easier for us to work with.

import argparse
import os

# Argument parsing
parser = argparse.ArgumentParser()
parser.add_argument('--path', type=str,
                    help='Path to the openimages data')
args = parser.parse_args()
PATH = args.path

# Get all folders within PATH, one for each class that was downloaded
folders = [name for name in os.listdir(
    PATH) if os.path.isdir(os.path.join(PATH, name))]

for folder in folders:
    # For each class, take all images and xml files and put them together in the same, common folder
    folder_path = os.path.join(PATH, folder)

    images_path = os.path.join(folder_path, 'images')
    for file_name in os.listdir(images_path):
        os.rename(os.path.join(images_path, file_name),
                  os.path.join(folder_path, file_name))

    pascal_path = os.path.join(folder_path, 'pascal')
    for file_name in os.listdir(pascal_path):
        os.rename(os.path.join(pascal_path, file_name),
                  os.path.join(folder_path, file_name))

    os.rmdir(images_path)
    os.rmdir(pascal_path)
