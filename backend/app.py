from flask import Flask, request, jsonify
from flask_cors import CORS
from mysql.connector import Error
import sys
import os

app = Flask(__name__)
CORS(app)

ruta_conexion_bd = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', './backend/conexion'))
sys.path.append(ruta_conexion_bd)
from conexion_bd import obtener_conexion, cerrar_conexion

@app.route('/')
def home():
    return "MySQL con python backend y React frontend"

@app.route('/clientes', methods=['GET'])
def obtener_clientes():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    query = "SELECT * FROM clientes_datos"
    cursor.execute(query)
    datos = cursor.fetchall()
    cursor.close()
    cerrar_conexion(conexion)
    return jsonify(datos)

@app.route('/cliente', methods=['POST'])
def insertar_cliente():
    data = request.json
    nombre = data['nombre']
    apellidos = data['apellidos']
    direccion = data['direccion']
    codigo_postal = data['codigo_postal']
    provincia = data['provincia']
    municipio = data['municipio']
    empresa_id = data['empresa_id']
    
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    query = "INSERT INTO clientes_datos(nombre, apellidos, direccion, codigo_postal, provincia, municipio,empresa_id) VALUES (%s, %s, %s, %s, %s, %s,%s)"
    valores = (nombre, apellidos, direccion, codigo_postal, provincia, municipio,empresa_id)
    cursor.execute(query, valores)
    conexion.commit()
    cursor.close()
    cerrar_conexion(conexion)
    return jsonify({'mensaje': 'Cliente insertado correctamente'})

@app.route('/cliente/<int:id>', methods=['PUT'])
def actualizar_cliente(id):
    data = request.json
    nombre = data['nombre']
    apellidos = data['apellidos']
    direccion = data['direccion']
    codigo_postal = data['codigo_postal']
    provincia = data['provincia']
    municipio = data['municipio']
    
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    query = "UPDATE clientes_datos SET nombre = %s, apellidos = %s, direccion = %s, codigo_postal = %s, provincia = %s, municipio = %s WHERE id = %s"
    valores = (nombre, apellidos, direccion, codigo_postal, provincia, municipio, id)
    cursor.execute(query, valores)
    conexion.commit()
    cursor.close()
    cerrar_conexion(conexion)
    return jsonify({'mensaje': 'Cliente actualizado correctamente'})

@app.route('/cliente/<int:id>', methods=['DELETE'])
def eliminar_cliente(id):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    query = "DELETE FROM clientes_datos WHERE id = %s"
    cursor.execute(query, (id,))
    conexion.commit()
    cursor.close()
    cerrar_conexion(conexion)
    return jsonify({'mensaje': 'Cliente eliminado correctamente'})

@app.route('/empresa', methods=['GET'])
def obtener_empresas():
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    query = "SELECT id, empresa FROM empresa"  
    cursor.execute(query)
    datos = cursor.fetchall()
    cursor.close()
    cerrar_conexion(conexion)
    return jsonify(datos)


if __name__ == '__main__':
    app.run(debug=True)
