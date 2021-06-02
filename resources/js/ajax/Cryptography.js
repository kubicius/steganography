class Cryptography{

    constructor() {
        this.apiURL = 'http://127.0.0.1:8000/';
    }

    setText(text){
        this.text = text;
    }

    encode(){
        if(this.text != undefined){
            let request = new XMLHttpRequest();
            request.open('POST', this.apiURL + 'encode?text=' + this.text, false);
            request.send();
            return JSON.parse(request.response);
        }
    }

    decode(){
        if(this.text != undefined){
            let request = new XMLHttpRequest();
            request.open('POST', this.apiURL + 'decode?text=' + this.text, false);
            request.send();
            return JSON.parse(request.response);
        }
    }
}