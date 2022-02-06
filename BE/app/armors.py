from flask import Blueprint, request, jsonify, render_template
from bson import json_util
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

@armors.route("/fetch_armor_with_skill", methods=['POST'])
def fetch_armor_with_skill():
    data = request.get_json()
    query_result = mongo.db.armors.find()
    sanitized_result = json_util.loads(json_util.dumps(query_result))

    armor_set = ['helm', 'torso', 'arms', 'waist', 'legs']
    final_result = {}

    ### ================================ This is stupid ================================ ###
    
    for skill in data['skills']:
        skill_result = {}

        for armor in armor_set:
            armor_result = []

            for armor_piece in sanitized_result[0][armor]:    
                if armor_piece['skills']['skill_1']['skill_name'] == skill:
                    armor_result.append(armor_piece['armor_name'])

                elif armor_piece['skills']['skill_2']['skill_name'] == skill:
                    armor_result.append(armor_piece['armor_name'])
                
                elif armor_piece['skills']['skill_3']['skill_name'] == skill:
                    armor_result.append(armor_piece['armor_name'])

                elif (armor == 'torso' or armor == 'waist') and armor_piece['skills']['skill_1']['skill_name'] == skill:
                    armor_result.append(armor_piece['armor_name'])

                skill_result[armor] = armor_result

        final_result[skill] = skill_result

    ### ================================================================================ ###


    # result_set = {
    #     'skill_name': {
    #         'helm': [ ... ],
    #         'torso': [ ... ],
    #         'arms': [ ... ],
    #         'waist': [ ... ],
    #         'legs': [ ... ]
    #     },
    #     'skill_name': [ ... ] 
    # }

    return jsonify(final_result)

@armors.route("/add_wishlist", methods=['POST'])
def add_wishlist():
    data = request.get_json()
    print(data)

    return jsonify({'ok': True}), 200