from cryptography.fernet import Fernet
from storage import Storage
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding


class Cipher:
    """
    Class meant to coding data.
    """

    def encodeSymmetric(self, string):
        storage = Storage()
        key = storage.readKey('symmetric')
        if key:
            f = Fernet(key)
            return {"result": True, "encoded": f.encrypt(string.encode())}
        else:
            return {"result": False}

    def decodeSymmetric(self, string):
        storage = Storage()
        key = storage.readKey('symmetric')
        if key:
            f = Fernet(key)
            return {"result": True, "encoded": f.decrypt(string.encode())}
        else:
            return {"result": False}

    def encodeAsymmetric(self, string):
        # TODO
        return

    def decodeAsymmetric(self, string):
        # TODO
        return

    def sign(self, string):
        # TODO
        storage = Storage()
        key = storage.readKey('private')
        signature = key.sign(
            string.encode(),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return {"Result": signature}

    def verify(self, string):
        # TODO
        storage = Storage()
        key = storage.readKey('public')
        verification = key.verify(
            key,
            string,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return {"Result": verification}
