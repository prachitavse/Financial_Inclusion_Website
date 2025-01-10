import pandas as pd
import sqlite3
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib

def preprocess_data():
    try:
        # Connect to SQLite
        connection = sqlite3.connect('C:/Users/prach/EY/Financial_Inclusion_Website/ml/training/database.db')

        # Load data into a DataFrame
        query = "SELECT * FROM data"
        df = pd.read_sql_query(query, connection)
        connection.close()

        df['savings_rate'] = df['monthly_savings'] / df['monthly_income']
        df['loan_ratio'] = df['monthly_loans'] / df['monthly_income']
        df['timeline_to_goal'] = (df['goal'] - df['monthly_savings']) / df['monthly_savings']
        df['financial_stability'] = df.apply(
            lambda row: 'Stable' if row['savings_rate'] > 0.2 else ('At Risk' if row['loan_ratio'] > 0.3 else 'Critical'), axis=1
        )
        df['expense_anomalies'] = (df[['travel_expense', 'commute_expense', 'personal_expense',
                                    'educational_expense', 'seasonal_expense']].sum(axis=1) > 0.4 * df['monthly_income']).astype(int)

        # le_financial_stability = LabelEncoder()
        # df['financial_stability'] = le_financial_stability.fit_transform(df['financial_stability'])
        
        # Separate inputs and outputs
        X = df.drop(columns=["id", "improvement", "policies", "financial_stability"])
        y1 = LabelEncoder().fit_transform(df["improvement"])
        y2 = LabelEncoder().fit_transform(df["policies"])
        y3 = LabelEncoder().fit_transform(df["financial_stability"])

        # Fit the StandardScaler on the training data
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)  # Fit and scale the data

        # Save the fitted scaler to be reused during prediction
        joblib.dump(scaler, 'scaler.pkl')

        return X_scaled, y1, y2, y3
    except Exception as e:
        print("Error in preprocess_input:", str(e))
        raise e

