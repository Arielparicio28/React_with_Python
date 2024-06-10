import mysql.connector
from mysql.connector import Error

#Logica para conectar a mi base de datos
def obtener_conexion():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='factura',
            user='root',
            password=''
        )
        if connection.is_connected():
            print("Conexión exitosa a la base de datos")
            return connection
    except Error as e:
        print(f"Error al conectar a MySQL: {e}")
        return None

def cerrar_conexion(connection):
    if connection and connection.is_connected():
        connection.close()
        print("Conexión cerrada")
