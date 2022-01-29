from flask import Flask
from flask_cors import CORS
from .todos import todos
from .armors import armors
from .extension import mongo

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://admin:admin123@cluster-condusk.l2mgi.mongodb.net/conduskdb?retryWrites=true&w=majority"

mongo.init_app(app)

app.register_blueprint(todos)
app.register_blueprint(armors)

CORS(app)