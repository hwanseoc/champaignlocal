import os
from flask import Flask, request, jsonify
import json

import auth
import stores
import users
from flask_cors import CORS
from routes import indexRoute, getRoute, itemRoute, updateRoute

application = Flask(__name__, static_folder='./static/build')
CORS(application)

application.register_blueprint(indexRoute)
application.register_blueprint(getRoute)
application.register_blueprint(itemRoute)
application.register_blueprint(updateRoute)

@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(f"{application.static_folder}/{path}"):
        return application.send_static_file(path)
    else:
        return application.send_static_file('index.html')

@application.errorhandler(404)
def not_found(e):
    return application.send_static_file('index.html'), 404

@application.route('/api/test')
def api_test():
    return {'ok': True}

@application.route('/api/users/login', methods=['POST'])
def api_users_login():
    payload = request.get_json()
    valid, username, groups, token = auth.loginJWT(payload.get('username'), payload.get('password'))
    if valid:
        return {'ok': True, 'username': username, 'groups': groups, 'token': token}
    else:
        return {'ok': False}, 401

@application.route('/api/users/validate')
def api_users_validate():
    valid, username, groups, token = auth.validateJWT(request.headers.get('Authorization'))
    if not valid:
        return {'ok': False}, 401
    return {'ok': True, 'username': username, 'groups': [], 'token': token}

@application.route('/api/users/register', methods=['POST'])
def api_users_register():
    payload = request.get_json()
    users.create_user(
        payload.get("displayname"),
        payload.get("username"),
        payload.get("password")
    )
    return {'ok': True}

@application.route('/api/users/update', methods=['POST'])
def api_users_update():
    payload = request.get_json()
    users.update_user(
        payload.get("displayname"),
        payload.get("username"),
        payload.get("password")
    )
    return {'ok': True}

@application.route('/api/users/delete', methods=['POST'])
def api_users_delete():
    payload = request.get_json()
    users.delete_user(
        payload.get('username')
    )
    return {'ok': True}

@application.route('/api/stores/one', methods=['GET'])
def api_stores_one():
    one_store = stores.one_store(request.args.get('id'))
    return {'ok': True, 'store': one_store}

@application.route('/api/stores/all', methods=['GET'])
def api_stores_all():
    all_stores = stores.all_stores()
    return {'ok': True, 'stores': all_stores}

@application.route('/api/stores/name-search', methods=['GET'])
def api_stores_name_search():
    searched_stores = stores.search_stores_by_name(
        request.args.get('keyword'),
        request.args.get('minRating'),
        json.loads(request.args.get('takeout'))
    )
    return {'ok': True, 'stores': searched_stores}

@application.route('/api/stores/create', methods=['POST'])
def api_stores_create():
    payload = request.get_json()
    created_id = stores.create_store(
        payload.get('name'),
        payload.get('location'),
        payload.get('hours'),
        payload.get('owner'),
        payload.get('ratings'),
        payload.get('covid_restrictions')
    )
    one_store = stores.one_store(created_id)
    return {'ok': True, 'store': one_store}

@application.route('/api/stores/update', methods=['POST'])
def api_stores_update():
    payload = request.get_json()
    updated_id = stores.update_store(
        payload.get('id'),
        payload.get('name'),
        payload.get('location'),
        payload.get('hours'),
        payload.get('owner'),
        payload.get('ratings'),
        payload.get('covid_restrictions')
    )
    one_store = stores.one_store(updated_id)
    return {'ok': True, 'store': one_store}

@application.route('/api/stores/delete', methods=['POST'])
def api_stores_delete():
    payload = request.get_json()
    stores.delete_store(payload.get('id'))
    return {'ok': True}

@application.route('/api', defaults={'path': ''})
@application.route('/api/<path:path>')
def api_not_found(path):
    return {'ok': False, 'error': "api not found"}, 404

if __name__ == "__main__":
    application.debug = True
    application.run(port=int(os.environ.get('PORT', 5001)))
