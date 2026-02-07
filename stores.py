import psycopg2
import os

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

def one_store(store_id):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                SELECT * FROM Stores
                WHERE Store_ID = %s;
                """
        cursor.execute(query, (store_id,))
        store = cursor.fetchone()
    finally:
        connection.close()
    if store is None:
        return None
    return {
        "id": store[0],
        "name": store[1],
        "location": store[2],
        "hours": store[3],
        "owner": store[4],
        "ratings": float(store[5]) if store[5] is not None else 0.0,
        "covid_restrictions": store[6]
    }

def all_stores():
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM Stores;"
        cursor.execute(query)
        result = cursor.fetchall()
    finally:
        connection.close()

    result = list(map(lambda store: {
        "id": store[0],
        "name": store[1],
        "location": store[2],
        "hours": store[3],
        "owner": store[4],
        "ratings": float(store[5]) if store[5] is not None else 0.0,
        "covid_restrictions": store[6]
    }, list(result)))
    return result

def search_stores_by_name(keyword, minRating, takeoutArr):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        if not takeoutArr:
            return []
        placeholders = ','.join(['%s'] * len(takeoutArr))
        query = f"""
                SELECT s.Store_ID,
                       s.Store_Name,
                       s.Store_Location,
                       s.Opening_Hours,
                       s.Store_Owner,
                       s.Store_Ratings,
                       s.Covid_Restrictions,
                       u.User_Displayname
                FROM Stores s JOIN Users u ON s.Store_Owner = u.User_Username
                WHERE s.Store_Name ILIKE %s
                  AND s.Store_Ratings > %s
                  AND s.Covid_Restrictions IN ({placeholders})
                """
        params = [f"%{keyword}%", float(minRating)] + takeoutArr
        cursor.execute(query, params)
        result = cursor.fetchall()
    finally:
        connection.close()

    result = list(map(lambda store: {
        "id": store[0],
        "name": store[1],
        "location": store[2],
        "hours": store[3],
        "owner": f"{store[7]} ({store[4]})",
        "ratings": float(store[5]) if store[5] is not None else 0.0,
        "covid_restrictions": store[6]
    }, list(result)))
    return result

def create_store(name, location, hours, owner, ratings, covid_restrictions):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                INSERT INTO Stores(
                    Store_Name, Store_Location, Opening_Hours,
                    Store_Owner, Covid_Restrictions
                ) VALUES (%s, %s, %s, %s, %s)
                RETURNING Store_ID;
                """
        cursor.execute(query, (name, location, hours, owner, covid_restrictions))
        result = cursor.fetchone()[0]
        connection.commit()
    finally:
        connection.close()
    return result

def update_store(store_id, name, location, hours, owner, ratings, covid_restrictions):
    connection = get_connection()
    try:
        cursor = connection.cursor()

        if name:
            cursor.execute("UPDATE Stores SET Store_Name = %s WHERE Store_ID = %s", (name, store_id))
        if location:
            cursor.execute("UPDATE Stores SET Store_Location = %s WHERE Store_ID = %s", (location, store_id))
        if hours:
            cursor.execute("UPDATE Stores SET Opening_Hours = %s WHERE Store_ID = %s", (hours, store_id))
        if owner:
            cursor.execute("UPDATE Stores SET Store_Owner = %s WHERE Store_ID = %s", (owner, store_id))
        if ratings:
            cursor.execute("UPDATE Stores SET Store_Ratings = %s WHERE Store_ID = %s", (ratings, store_id))
        if covid_restrictions:
            cursor.execute("UPDATE Stores SET Covid_Restrictions = %s WHERE Store_ID = %s", (covid_restrictions, store_id))

        connection.commit()
    finally:
        connection.close()
    return store_id

def delete_store(store_id):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                DELETE FROM Stores
                WHERE Store_ID = %s
                """
        cursor.execute(query, (store_id,))
        connection.commit()
    finally:
        connection.close()
