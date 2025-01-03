import numpy as np
from sklearn.preprocessing import StandardScaler

# Load scaler (optional, if used during training)
scaler = StandardScaler()

def preprocess_input(inputs):
    """
    Preprocess the input data before feeding to models.
    """
    # Apply the same scaling logic as in training
    return scaler.transform(inputs)
