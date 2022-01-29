from flask import Blueprint, request, jsonify, render_template
from bson import json_util, ObjectId
from .extension import mongo

armors = Blueprint('armors', __name__)

@armors.route("/")
def home():
    return render_template('home.html')

@armors.route("/fetch_skills", methods=['GET'])
def fetch_skills():
    query_result = mongo.db.armors.find( { 'skills': { '$exists': True } })
    final_result = json_util.loads(json_util.dumps(query_result))
    for i in final_result: i['_id'] = str(i['_id'])

    return jsonify(final_result)