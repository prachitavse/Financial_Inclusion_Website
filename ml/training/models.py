import threading
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
from preprocess import preprocess_data

def train_model(X, y, model_path):
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    # Save model
    with open(model_path, 'wb') as f:
        joblib.dump(model, f)
    print(f"Model saved to {model_path}")

def train_linear_model(X, y, model_path):
    model = LinearRegression()
    model.fit(X, y)
    joblib.dump(model, model_path)
    print(f"Regression model saved to {model_path}")

def train_clustering_model(X, model_path):
    model = KMeans(n_clusters=3, random_state=42)
    model.fit(X)
    joblib.dump(model, model_path)
    print(f"Clustering model saved to {model_path}")

def train_anomaly_model(X, model_path):
    model = IsolationForest(random_state=42)
    model.fit(X)
    joblib.dump(model, model_path)
    print(f"Anomaly detection model saved to {model_path}")

# Load preprocessed data
X, y1, y2, y3 = preprocess_data()

# Concurrently train models
thread1 = threading.Thread(target=train_model, args=(X, y1, "../models/model1.pkl"))
thread2 = threading.Thread(target=train_model, args=(X, y2, "../models/model2.pkl"))
thread3 = threading.Thread(target=train_linear_model, args=(X, y3, "../models/linear_model.pkl"))  # Timeline to goal
thread4 = threading.Thread(target=train_clustering_model, args=(X, "../models/clustering_model.pkl"))
thread5 = threading.Thread(target=train_anomaly_model, args=(X, "../models/anomaly_model.pkl"))

thread1.start()
thread2.start()
thread3.start()
thread4.start()
thread5.start()

thread1.join()
thread2.join()
thread3.join()
thread4.join()
thread5.join()