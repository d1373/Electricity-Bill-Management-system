from flask import Flask, jsonify, request,redirect
from flask_cors import cross_origin, CORS
import sqlite3
import json

app = Flask(__name__)
#CORS(app, resources={r'*': {'origins': '*'}})

CORS(app)
DATABASE = 'electricitybillmanagementsystem.db'
def connect_db():
    return sqlite3.connect(DATABASE)

def init_db():
    with app.app_context():
        db = connect_db()
        db.execute('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT,address TEXT,city TEXT,state TEXT,zip TEXT)')
        db.execute('CREATE TABLE IF NOT EXISTS bills (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, amount REAL, due_date DATE, FOREIGN KEY(customer_id) REFERENCES customers(id))')
        db.commit()

@app.route('/customers', methods=['GET'])
def get_customers():
    db = connect_db()
    cur = db.execute('SELECT * FROM customers')
    customers = cur.fetchall()
    db.close()
    return jsonify(customers)

@app.route('/customers/<int:id>', methods=['GET'])
def get_customer(id):
    db = connect_db()
    cur = db.execute('SELECT * FROM customers WHERE id = ?', [id])
    customer = cur.fetchone()
    db.close()
    return jsonify(customer)
@app.route('/customers/<string:city>', methods=['GET'])
def get_city(city):
    db = connect_db()
    cur = db.execute('SELECT * FROM customers WHERE city = ?', [city])
    customer = cur.fetchall()
    db.close()
    return jsonify(customer)
@app.route('/customers', methods=['POST'])
def create_customer():
    db = connect_db()
    db.execute('INSERT INTO customers (id,name, email, phone , address, city,state,zip) VALUES (?, ?, ?,?,?,?,?,?)',
                [request.json['id'],request.json['name'], request.json['email'], request.json['phone'], request.json['address'], request.json['city'], request.json['state'], request.json['zip']])
    db.commit()
    db.close()
    return jsonify({'message': 'Customer created successfully'})

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    db = connect_db()
    db.execute('UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ? WHERE id = ?',
                [request.json['name'], request.json['email'], request.json['phone'], request.json['address'], request.json['city'], request.json['state'], request.json['zip'], id])
    db.commit()
    db.close()
    return jsonify({'message': 'Customer updated successfully'})

@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    db = connect_db()
    db.execute('DELETE FROM customers WHERE id = ?', [id])
    db.commit()
    db.close()
    return jsonify({'message': 'Customer deleted successfully'})

@app.route('/bills', methods=['GET'])
def get_bills():
    db = connect_db()
    cur = db.execute('SELECT * FROM bills')
    bills = cur.fetchall()
    db.close()
    return jsonify(bills)

@app.route('/bills/<int:customer_id>', methods=['GET'])
def get_bill(customer_id):
    db = connect_db()
    cur = db.execute('SELECT * FROM bills WHERE customer_id = ?', [customer_id])
    bill = cur.fetchall()
    db.close()
    return jsonify(bill)

@app.route('/bills/e/<int:id>', methods=['GET'])
def get_bill_id(id):
    db = connect_db()
    cur = db.execute('SELECT * FROM bills WHERE id = ?', [id])
    bill = cur.fetchall()
    db.close()
    return jsonify(bill)
@app.route('/bills', methods=['POST'])
def create_bill():
    db = connect_db()
    db.execute('INSERT INTO bills (customer_id, amount, due_date) VALUES (?, ?, ?)',
                [request.json['customer_id'], request.json['amount'], request.json['due_date']])
    db.commit()
    db.close()
    return jsonify({'message': 'Bill created successfully'})

@app.route('/bills/<int:id>', methods=['PUT'])
def update_bill(id):
    db = connect_db()
    db.execute('UPDATE bills SET customer_id = ?, amount = ?, due_date = ? WHERE id = ?',
                [request.json['customer_id'], request.json['amount'], request.json['due_date'], id])
    db.commit()
    db.close()
    return jsonify({'message': 'Bill updated successfully'})

@app.route('/bills/<int:id>', methods=['DELETE'])
def delete_bill(id):
    db = connect_db()
    db.execute('DELETE FROM bills WHERE id = ?', [id])
    db.commit()
    db.close()
    return jsonify({'message': 'Bill deleted successfully'})

@app.route('/')
def home ():
    return "hey"
if __name__ == '__main__':
    app.run(debug=True)
