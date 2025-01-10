import sqlite3

# Connect to SQLite
connection = sqlite3.connect('database.db')
cursor = connection.cursor()

# Execute schema
with open('./schema.sql', 'r') as f:
    cursor.executescript(f.read())

connection.commit()
connection.close()
