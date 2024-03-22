#!/usr/bin/env python3
'''Main faces-compare script'''

import argparse
from pathlib import Path

import cv2

import numpy as np

from images import get_face
from model import facenet_model, img_to_encoding

model = facenet_model(input_shape=(3, 96, 96))

def run(image_one, image_two):
    # Load images
    image_index = 1
    try:
        face_one = get_face(cv2.imread(str(image_one), 1))
        image_index = 2
        face_two = get_face(cv2.imread(str(image_two), 1))
    except IndexError:
        print(f"ERROR: no face detected in image {image_index}")
        return

    # Calculate embedding vectors
    embedding_one = img_to_encoding(face_one, model)
    embedding_two = img_to_encoding(face_two, model)

    dist = np.linalg.norm(embedding_one - embedding_two)
    print(f'Distance between two images is {dist}')
    if dist > 0.7:
        return False
    else:
        return True