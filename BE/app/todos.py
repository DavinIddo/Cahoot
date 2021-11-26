from flask import Blueprint, request, jsonify, render_template

todos = Blueprint('todos', __name__)

@todos.route("/")
def home():
    return render_template('home.html')

@todos.route("/submit_todo", methods=['POST'])
def submit_todo():
    if request.method == 'POST':
        return jsonify({'ok': True, 'message': 'True request method'}), 200

    return jsonify({'ok': False, 'message': 'False request method'}), 400

