from flask import Blueprint, request, jsonify, render_template
from bson import json_util
from .extension import mongo

todos = Blueprint('todos', __name__)

@todos.route("/")
def home():
    return render_template('home.html')

@todos.route("/submit_todo", methods=['POST'])
def submit_todo():
    if request.method == 'POST':
        data = request.get_json()
        data["completed"] = False

        mongo.db.todos.insert_one(data)
        mongo.db.todos.delete_one({'_id': data['_id']})
        
        all_result = mongo.db.todos.find()
        all_todos = json_util.loads(json_util.dumps(all_result))

        for i in all_todos: i['_id'] = str(i['_id'])

        # return jsonify({'ok': True, 'message': 'True request method'}), 200
        return jsonify({'ok': True, 'message': 'True request method', 'todos_list': all_todos}), 200

    return jsonify({'ok': False, 'message': 'False request method'}), 400

