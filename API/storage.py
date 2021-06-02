from cryptography.hazmat.primitives import serialization


class Storage:
    """
    Class destined to make storage operations.
    """

    def writeKey(self, type, key):
        file = open('keys/'+type+'.key', 'wb')
        if file.write(key):
            return True
        else:
            return False

    def readKey(self, type):
        if type == "symmetric":
            return bytes.fromhex(open('keys/' + type + '.key', 'r').read())
        else:
            file = open('keys/' + type + '.key', 'rb')
            return serialization.load_pem_private_key(
                file.read(),
                password=None
            )

