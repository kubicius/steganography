from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from key import Key
from cipher import Cipher


app = FastAPI()
keyObj = Key()
cipherObj = Cipher()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/key")
def get_symmetric_key():
    """
    Returns random generated HEX key
    """
    return keyObj.generate()

@app.post("/key")
def set_symmetric_key(key: str):
    """
    Sets passed HEX key on server
    """
    return keyObj.setKey(key)

@app.post("/encode")
def encode_symmetric(text: str):
    """
    Returns passed string but encoded
    """
    return cipherObj.encodeSymmetric(text)

@app.post("/decode")
def decode_symmetric(text: str):
    """
    Returns passed string but decoded
    """
    return cipherObj.decodeSymmetric(text)