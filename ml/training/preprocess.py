import pandas as pd
import sqlite3
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib

def preprocess_data():
    # Connect to SQLite
    connection = sqlite3.connect('C:/Users/prach/EY/Financial_Inclusion_Website/ml/training/database.db')

    # Load data into a DataFrame
    query = "SELECT * FROM data"
    df = pd.read_sql_query(query, connection)
    connection.close()

    # Separate inputs and outputs
    X = df.drop(columns=["id", "improvement", "policies"])
    y1 = LabelEncoder().fit_transform(df["improvement"])
    y2 = LabelEncoder().fit_transform(df["policies"])

    # Fit the StandardScaler on the training data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)  # Fit and scale the data

    # Save the fitted scaler to be reused during prediction
    joblib.dump(scaler, 'scaler.pkl')

    return X_scaled, y1, y2

