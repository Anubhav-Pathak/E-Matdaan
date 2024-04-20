from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import base64
import io
from PIL import Image
import cv2
import numpy as np

from bin.images import get_face
from bin.model import facenet_model, img_to_encoding

model = facenet_model(input_shape=(3, 96, 96))

app = Flask(__name__)
CORS(app)

@app.route('/compare', methods=['POST'])
@cross_origin(origin='*')
def compare():

    voterImage = request.form['voterImage']
    userImage = request.form['userImage']

    voterImage = Image.open(io.BytesIO(base64.b64decode(voterImage))).convert('RGB')
    userImage = Image.open(io.BytesIO(base64.b64decode(userImage.split(",")[1]))).convert('RGB')

    voterImage = cv2.cvtColor(np.array(voterImage), cv2.COLOR_RGB2BGR)
    userImage = cv2.cvtColor(np.array(userImage), cv2.COLOR_RGB2BGR)

    try:
        userImage = get_face(userImage)
        voterImage = get_face(voterImage)
    except IndexError:
        return jsonify({'result': 'error', 'message': 'No face detected in image'})
    
    embedding_voter = img_to_encoding(voterImage, model)
    embedding_user = img_to_encoding(userImage, model)

    dist = np.linalg.norm(embedding_voter - embedding_user)

    if dist > 0.8:
        return jsonify({'matched': False}), 401
    else:
        return jsonify({'matched': True}), 200

if __name__ == '__main__':
    app.run(debug=True)