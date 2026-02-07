import psycopg2
import os
from werkzeug.security import generate_password_hash, check_password_hash

from dotenv import load_dotenv
load_dotenv()

def get_connection():
    connection = psycopg2.connect(
        host=os.environ.get('PG_HOST'),
        port=os.environ.get('PG_PORT', '5432'),
        user=os.environ.get('PG_USER'),
        password=os.environ.get('PG_PASSWORD'),
        dbname=os.environ.get('PG_DBNAME'),
    )
    return connection

def check_user(username, password):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                SELECT User_Password
                FROM Users
                WHERE User_Username = %s
                """
        cursor.execute(query, (username,))
        result = cursor.fetchone()
    finally:
        connection.close()
    if result is None:
        return False
    return check_password_hash(result[0], password)

def create_user(displayname, username, password):
    hashed = generate_password_hash(password)
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                INSERT INTO Users(
                    User_Username, User_Password, User_Displayname
                ) VALUES (%s, %s, %s)
                RETURNING User_ID;
                """
        cursor.execute(query, (username, hashed, displayname))
        result = cursor.fetchone()[0]
        connection.commit()
    finally:
        connection.close()
    return result

def update_user(displayname, username, password):
    connection = get_connection()
    try:
        cursor = connection.cursor()

        if displayname:
            query = """
                    UPDATE Users
                    SET User_Displayname = %s
                    WHERE User_Username = %s
                    """
            cursor.execute(query, (displayname, username))

        if password:
            hashed = generate_password_hash(password)
            query = """
                    UPDATE Users
                    SET User_Password = %s
                    WHERE User_Username = %s
                    """
            cursor.execute(query, (hashed, username))

        connection.commit()
    finally:
        connection.close()
    return username

def delete_user(username):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                DELETE FROM Users
                WHERE User_Username = %s
                """
        cursor.execute(query, (username,))
        connection.commit()
    finally:
        connection.close()
