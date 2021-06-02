
window.addEventListener('DOMContentLoaded', function (event){
    const steganography = document.querySelector('#steganography');

    if(typeof steganography != undefined){
        let dataEntry = steganography.querySelector('#data_entry');
        dataEntry.classList.add('fadeable');
        let input = dataEntry.querySelector('#input_text');

        window.setTimeout( function() {
            dataEntry.className += ' fade-in';
            input.focus();
        }, 50);

        input.addEventListener( "change", function(){
            let cryptographyObj = new Cryptography();
            cryptographyObj.setText(this.value);
            let encoded = cryptographyObj.encode();
            
        });
    }

});