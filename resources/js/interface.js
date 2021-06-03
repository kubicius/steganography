const steganography = document.querySelector('#steganography');

window.addEventListener('DOMContentLoaded', function (event){
    if(typeof steganography != undefined){
        let chooseOption = steganography.querySelector('#choose_option');
        showBox(chooseOption, null);
        steganography.addEventListener('click', function (event){
            if(event.target.id == 'hide'){
                event.preventDefault();
                hideBox(chooseOption);
                handleHide();
            }

            if(event.target.id == 'reveal'){
                event.preventDefault();
                hideBox(chooseOption);
                handleReveal();
            }

            if(event.target.id == 'finish'){
                event.preventDefault();
                let result = steganography.querySelector('#result');
                hideBox(result);
                window.setTimeout( function() {
                    window.location.reload();
                }, 1000);
            }
        });
        window.addEventListener("dragover", function(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        });
    }

});

function handleHide(){
    let dataEntry = steganography.querySelector('#data_entry');
    let input = dataEntry.querySelector('#input_text');
    showBox(dataEntry, input);

    let pictureEntry = steganography.querySelector('#picture_entry');
    let pictureInput = steganography.querySelector('#input_picture');
    
    let encodedInfo = steganography.querySelector('#encoded_info');
    let encodedInput = encodedInfo.querySelector('#input_encoded');   

    let result = steganography.querySelector('#result');

    steganography.addEventListener('change', function (event){
        if(event.target.id == input.id) {     
            let cryptographyObj = new Cryptography();
            cryptographyObj.setText(event.target.value);
            let encoded = cryptographyObj.encode();
            hideBox(dataEntry);

            encodedInput.innerHTML = encoded.encoded;
            showBox(encodedInfo, encodedInput);
            window.setTimeout( function() {
                hideBox(encodedInfo);
                showBox(pictureEntry, pictureInput);
            }, 5000);
        }
    });

    window.addEventListener("drop", function(event) {
        event.stopPropagation();
        event.preventDefault();
        if (pictureEntry.style.display == 'block') {
            pictureInput.files = event.dataTransfer.files;
            handleImage('hide', pictureInput, pictureEntry, result, encodedInput.innerHTML);
        }
    });

    window.addEventListener('change', function (event){
        if(event.target.id == pictureInput.id){
            console.log(event);
            handleImage('hide', event.target, pictureEntry, result, encodedInput.innerHTML);
        }
    });
}

function handleReveal(){
    let pictureEntry = steganography.querySelector('#picture_entry');
    let pictureInput = steganography.querySelector('#input_picture');
    let result = steganography.querySelector('#result');

    showBox(pictureEntry, pictureInput);

    window.addEventListener('change', function (event){
        if(event.target.id == pictureInput.id){
            handleImage('reveal', event.target, pictureEntry, result);
        }
    });

    window.addEventListener("drop", function(event) {
        event.stopPropagation();
        event.preventDefault();
        if (pictureEntry.style.display == 'block') {
            pictureInput.files = event.dataTransfer.files;
            handleImage('reveal', pictureInput, pictureEntry, result);
        }
    });
}

function showBox(element, input){
    window.setTimeout( function() {
        element.style.display = 'block';
        element.classList.add('fadeable');
        window.setTimeout( function() {
            element.className += ' fade-in';
            if(input != null){
                input.focus();
            }
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

function handleImage(mode, pictureInput, pictureEntry, result, input){
    hideBox(pictureEntry);
    if(mode == 'hide'){
        steganographyHide(pictureInput, input);
    }else if(mode == 'reveal'){
        // Unfortunately following function do not return string so text decoding is impossible.
        steganographyReveal(pictureInput);
    }
    showBox(result, null);
    let canvas = document.querySelector('#imageCanvas');
    canvas.style.display = 'block';
}