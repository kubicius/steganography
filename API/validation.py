from cryptography.fernet import Fernet


class Validation:
    """
    Validates data.
    """

    def validateSymmetricHex(self, key):
        try:
            Fernet(bytes.fromhex(key))
            return True
        except ValueError:
            return False

    def validateAsymmetricHex(self, key):
        # TODO
        try:
            return True
        except ValueError:
            return False