from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.asymmetric import rsa
from validation import Validation
from storage import Storage


class Key:
    """
    Class meant to generate and modify keys.
    """
    def generate(self):
        key = Fernet.generate_key().hex()
        return key

    def setKey(self, key):
        validation = Validation()
        if validation.validateSymmetricHex(key):
            storage = Storage()
            if storage.writeKey(type, key.encode()):
                return {"result": "Success!"}
            else:
                return {"result": "Key is valid but something went wrong."}
        else:
            return {"result": "Key is invalid."}