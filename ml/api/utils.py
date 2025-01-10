import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib

# Optionally load the scaler if it has been saved after training
# (after fitting it once on the training data)
def load_scaler():
    try:
        scaler = joblib.load('../training/scaler.pkl')  # Load pre-fitted scaler
    except FileNotFoundError:
        scaler = StandardScaler()  # If not found, create a new instance
    return scaler

def preprocess_input(inputs):
    """
    Preprocess the input data before feeding to models.
    """
    try:
        print('pre')
        # Load the pre-fitted scaler (this should be saved after training)
        scaler = load_scaler()
        print('post')
        # Use the fitted scaler to transform the new input data (do not fit again)
        return scaler.transform(inputs)  # Use transform instead of fit_transform
    except Exception as e:
        return(e)
