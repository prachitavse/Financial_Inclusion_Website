import threading
import joblib
from sklearn.ensemble import RandomForestClassifier
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

# Load preprocessed data
X, y1, y2 = preprocess_data()

# Concurrently train models
thread1 = threading.Thread(target=train_model, args=(X, y1, "../models/model1.pkl"))
thread2 = threading.Thread(target=train_model, args=(X, y2, "../models/model2.pkl"))

thread1.start()
thread2.start()

thread1.join()
thread2.join()
 