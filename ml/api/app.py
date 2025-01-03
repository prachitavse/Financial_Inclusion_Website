from flask import Flask, request, jsonify
import joblib
import numpy as np
from utils import preprocess_input
from mappings import LIST_MAPPINGS, TRAVEL_MAPPINGS

app = Flask(__name__)

# Load models
model1 = joblib.load('../models/model1.pkl')
model2 = joblib.load('../models/model2.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON request
        data = request.json
        inputs = np.array(data['inputs']).reshape(1, -1)  # Expecting a list of 9 inputs
        
        # Preprocess inputs
        preprocessed_inputs = preprocess_input(inputs)

        # Predict outputs
        prediction1 = model1.predict(preprocessed_inputs)[0]
        prediction2 = model2.predict(preprocessed_inputs)[0]
        
        improvement = LIST_MAPPINGS.get(prediction1, ["No suggestions available."])
        policies = TRAVEL_MAPPINGS.get(prediction2, "No travel advice available.")

        # Return predictions
        return jsonify({
            'status': 'success',
            'predictions': {
                'list1': improvement,
                'travelOption': policies
            }
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
