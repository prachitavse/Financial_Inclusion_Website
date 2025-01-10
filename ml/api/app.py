from flask import Flask, request, jsonify
import joblib
import numpy as np
from utils import preprocess_input
from mappings import LIST_MAPPINGS, TRAVEL_MAPPINGS, CLUSTERING_MAPPINGS, ANOMALY_MAPPINGS

app = Flask(__name__)

# Load models
model1 = joblib.load('../models/model1.pkl')  # RandomForestClassifier
model2 = joblib.load('../models/model2.pkl')  # Another model (RandomForest or different)
linear_model = joblib.load('../models/linear_model.pkl')  # LinearRegression
clustering_model = joblib.load('../models/clustering_model.pkl')  # KMeans
anomaly_model = joblib.load('../models/anomaly_model.pkl')  # IsolationForest

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON request
        data = request.json
        print("Received inputs:", data)  # Log inputs

        inputs = np.array(data['inputs']).reshape(1, -1)  # Expecting a list of inputs
        print("Input array reshaped:", inputs)

        # Preprocess inputs
        preprocessed_inputs = preprocess_input(inputs)
        print("Preprocessed inputs:", preprocessed_inputs)

        # Predict outputs
        prediction1 = model1.predict(preprocessed_inputs)[0]  # RandomForestClassifier
        prediction2 = model2.predict(preprocessed_inputs)[0]  # Another model
        if prediction2 < 0 or prediction2 > 4:
            prediction2 = 0  # Or any default class like 0, if it's out of range
        prediction3 = linear_model.predict(preprocessed_inputs)[0]  # LinearRegression
        prediction4 = clustering_model.predict(preprocessed_inputs)[0]  # KMeans
        prediction5 = anomaly_model.predict(preprocessed_inputs)[0]  # IsolationForest

        print("Predictions:", prediction1, prediction2, prediction3, prediction4, prediction5)

        # Fetch suggestions based on predictions
        policy_suggestions = LIST_MAPPINGS.get(prediction1, ["No policy advice available."])
        investment_suggestions = TRAVEL_MAPPINGS.get(prediction2, "No suggestions available.")
        goal_timeline = f"Estimated time to goal: {prediction3} months."  # For LinearRegression
        cluster_info = CLUSTERING_MAPPINGS.get(prediction4, "Cluster information not available.")
        anomaly_status = ANOMALY_MAPPINGS.get(prediction5, "No anomaly detected.")

        # Return predictions with updated keys
        return jsonify({
            'status': 'success',
            'predictions': {
                'policySuggestions': policy_suggestions,
                'investmentSuggestions': investment_suggestions,
                'goalTimeline': goal_timeline,
                'clusterInfo': cluster_info,
                'anomalyStatus': anomaly_status
            }
        })
    except Exception as e:
        print("Error in /predict endpoint:", str(e))
        return jsonify({'status': 'error', 'message': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

