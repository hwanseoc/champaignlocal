import os
from authlib.jose import jwt
from datetime import datetime, timedelta

from dotenv import load_dotenv
load_dotenv()

import users

def loginJWT(username, password):
    valid = users.check_user(username, password)

    if not valid:
        return False, None, None, None

    groups = []
    iat = datetime.utcnow()
    exp = iat + timedelta(seconds=60*60)

    header = {
        'alg': 'HS256'
    }

    payload = {
        'iat': iat,
        'exp': exp,
        'username': username,
        'groups': groups
    }

    token_bytes = jwt.encode(header, payload, os.environ.get('JWT_KEY'))
    token = token_bytes.decode('UTF-8') if isinstance(token_bytes, bytes) else str(token_bytes)

    return valid, username, groups, token

def validateJWT(token):
    try:
        claims = jwt.decode(token, os.environ.get('JWT_KEY'))
        claims.validate()
    except:
        return False, None, None, None
    return True, claims.get('username'), claims.get('groups'), token
