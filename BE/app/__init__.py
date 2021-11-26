from flask import Flask
from .todos import todos

app = Flask(__name__)

app.register_blueprint(todos)