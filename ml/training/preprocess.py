import pandas as pd
import sqlite3
from sklearn.preprocessing import LabelEncoder, StandardScaler

def preprocess_data():
    # Connect to SQLite
    connection = sqlite3.connect('training/database.db')

    # Load data into a DataFrame
    query = "SELECT * FROM data"
    df = pd.read_sql_query(query, connection)
    connection.close()

    # Separate inputs and outputs
    X = df.drop(columns=["id", "improvement", "policies"])
    y1 = LabelEncoder().fit_transform(df["improvement"])
    y2 = LabelEncoder().fit_transform(df["policies"])

    # Normalize numerical features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y1, y2
