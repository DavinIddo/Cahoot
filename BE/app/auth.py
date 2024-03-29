from flask import Blueprint, request, jsonify, render_template
from bson import json_util
import base64
from .extension import mongo

auth = Blueprint('auth', __name__)

@auth.route("/")
def home():
    return render_template('home.html')

@auth.route('/register', methods=['POST'])
def registration():
    data = request.get_json() 
    
    username = data['username']
    password = bytes(data['password'], encoding='utf-8')
    encoded_password = base64.b64encode(password)

    query_result = mongo.db.users.find({'username': username})
    sanitized_res = json_util.loads(json_util.dumps(query_result))

    if (len(sanitized_res) == 0):
        mongo.db.users.insert_one({ 'username': username, 'password': encoded_password })
        mongo.db.wishlists.insert_one({ 'username': username, 'wishlist': [] })

        return jsonify({'error': None}), 200

    else:
        return jsonify({'error': True}), 200

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json() 

    username = data['username']
    password = bytes(data['password'], encoding='utf-8')
    encoded_password = base64.b64encode(password)

    user_query = mongo.db.users.find({'username': username})
    sanitized_user = json_util.loads(json_util.dumps(user_query))

    pass_query = mongo.db.users.find({'username': username, 'password': encoded_password})
    sanitized_pass = json_util.loads(json_util.dumps(pass_query))

    if (sanitized_user):
        if (sanitized_pass):
            return jsonify({'error': None, 'message': 'everything is fine', 'username': username}), 200

        else:
            return jsonify({'error': True, 'message': 'The password is wrong!'}), 200
    
    else:
        return jsonify({'error': True, 'message': 'User does not exists!'}), 200
