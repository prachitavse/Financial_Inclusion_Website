import sqlite3
import pandas as pd

# Load CSV into a DataFrame
data = pd.read_csv('./data/MOCK_DATA.csv')

# Connect to SQLite
connection = sqlite3.connect('database.db')
cursor = connection.cursor()

# Insert data into the database
data.to_sql('data', connection, if_exists='replace', index=False)

connection.commit()
connection.close()

print("Data successfully ingested into SQLite.")
