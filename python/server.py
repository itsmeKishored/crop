from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    image_data = data['image']
    
    # Decode the image from the base64 string
    image = Image.open(BytesIO(base64.b64decode(image_data.split(",")[1])))
    
    # Here you can process the image if needed. For now, we'll just send it back.
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    encoded_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    return jsonify({"processed_image": encoded_image})

if __name__ == '__main__':
    app.run(debug=True)
