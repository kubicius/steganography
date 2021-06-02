from fastapi import FastAPI
from key import Key
from cipher import Cipher


app = FastAPI()
keyObj = Key()
cipherObj = Cipher()

@app.get("/symmetric/key")
def get_symmetric_key():
    """
    Returns random generated HEX key
    """
    return keyObj.generate()

@app.post("/symmetric/key")
def set_symmetric_key(key: str):
    """
    Sets passed HEX key on server
    """
    return keyObj.setKey(key)

@app.post("/symmetric/encode")
def encode_symmetric(string: str):
    """
    Returns passed string but encoded
    """
    return cipherObj.encodeSymmetric(string)

@app.post("/symmetric/decode")
def decode_symmetric(string: str):
    """
    Returns passed string but decoded
    """
    return cipherObj.decodeSymmetric(string)