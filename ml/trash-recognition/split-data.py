# This script takes all the data under "images/all" and split it
# into training and testing sets.
#
# This script expects data under "images/all" to be split along the
# different classes, each contains the image and xml files related to the class
#
# Example:
# - images/all:
#    - apple (contains all image and xml files for apples)
#    - banana (contains all image and xml files for bananas)
#    - ...

import os

ALL_DATA_PATH = 'images/all'
TEST_DATA_PATH = 'images/test'
TRAIN_DATA_PATH = 'images/train'

train_size = 0.9

folders = [name for name in os.listdir(ALL_DATA_PATH)
           if os.path.isdir(os.path.join(ALL_DATA_PATH, name))]

for folder in folders:
    folder_path = os.path.join(ALL_DATA_PATH, folder)
    train_path = os.path.join(TRAIN_DATA_PATH, folder)
    test_path = os.path.join(TEST_DATA_PATH, folder)
    if not os.path.exists(train_path):
        os.mkdir(train_path)
    if not os.path.exists(test_path):
        os.mkdir(test_path)

    files = [f for f in os.listdir(folder_path)
             if f.endswith('.xml')]
    num_files = len(files)

    print("Splitting folder {} with a {:.0%} training ratio".format(
        folder_path, train_size))
    for i, file_name in enumerate(files):
        no_ext = os.path.splitext(file_name)[0]
        if(i / num_files < train_size):
            target_dir = train_path
        else:
            target_dir = test_path

        os.rename(os.path.join(folder_path, no_ext + '.jpg'),
                  os.path.join(target_dir, no_ext + '.jpg'))
        os.rename(os.path.join(folder_path, no_ext + '.xml'),
                  os.path.join(target_dir, no_ext + '.xml'))

    print("Moved {} files to {}".format(
        len(os.listdir(train_path)), train_path))
    print("Moved {} files to {}".format(
        len(os.listdir(test_path)), test_path))
    os.rmdir(folder_path)

os.rmdir(ALL_DATA_PATH)
