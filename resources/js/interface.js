
window.addEventListener('DOMContentLoaded', function (event){
    const steganography = document.querySelector('#steganography');

    if(typeof steganography != undefined){
        let dataEntry = steganography.querySelector('#data_entry');
        let input = dataEntry.querySelector('#input_text');
        showBox(dataEntry, input);

        steganography.addEventListener('change', function (event){
            if(event.target.id == input.id) {     
                let cryptographyObj = new Cryptography();
                cryptographyObj.setText(event.target.value);
                let encoded = cryptographyObj.encode();
                hideBox(dataEntry);

                let encodedInfo = steganography.querySelector('#encoded_info');
                let encodedInput = encodedInfo.querySelector('#encoded_input');   
                encodedInput.innerHTML = encoded.encoded;
                showBox(encodedInfo, encodedInput);
                window.setTimeout( function() {
                    hideBox(encodedInfo);
                }, 5000);
            }
        });
    }

});

function showBox(element, input){
    window.setTimeout( function() {
        element.style.display = 'block';
        element.classList.add('fadeable');
        window.setTimeout( function() {
            element.className += ' fade-in';
            input.focus();
        }, 50);
    }, 1000);
}

function hideBox(element){
    window.setTimeout( function() {
        element.classList.add('fade-out');
    }, 50);
    
    window.setTimeout( function() {
        element.classList.remove('fade-in');
        element.style.display = 'none';
        element.classList.remove('fade-out');
        element.classList.remove('fadeable');
    }, 1000);
}
