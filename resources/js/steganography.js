function steganographyHide(target, input){
    let canvas = document.getElementById('imageCanvas');
    let canvasContext = canvas.getContext('2d');
    let textCanvas = document.getElementById('textCanvas');
    let textCanvasContext = textCanvas.getContext('2d');

    let reader = new FileReader();
    reader.addEventListener('load', function(event) {
        let image = new Image();
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            textCanvas.width = image.width;
            textCanvas.height = image.height;
            textCanvasContext.font = "32px Arial";
            textCanvasContext.fillText(input, 10, 50);
            canvasContext.drawImage(image, 0, 0);
            let imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
            let textData = textCanvasContext.getImageData(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < textData.data.length; i += 4) {
                if (textData.data[i+3] !== 0) {
                    if (imageData.data[i+1]%10 != 7 && imageData.data[i+1] > 247) {
                        imageData.data[i+1] = 247;
                    }
                    else {
                        while (imageData.data[i+1] % 10 != 7) {
                            imageData.data[i+1]++;
                        }
                    }
                }
                else {
                    if (imageData.data[i+1]%10 == 7) {
                        imageData.data[i+1]--;
                    }
                }
            }
            canvasContext.putImageData(imageData, 0, 0);
        });
        image.src = event.target.result;
    });
    reader.readAsDataURL(target.files[0]);
}

function steganographyReveal(target){
    let imageCanvas = document.getElementById('imageCanvas');
    let imageCanvasContext = imageCanvas.getContext('2d');

    let reader = new FileReader();
    reader.addEventListener('load', function(event) {
        let image = new Image();
        image.addEventListener('load', function() {
            imageCanvas.width = image.width;
            imageCanvas.height = image.height;
            imageCanvasContext.drawImage(image, 0, 0);

            let decodeData = imageCanvasContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
            for (let i = 0; i < decodeData.data.length; i += 4) {
                if (decodeData.data[i+1] % 10 == 7) {
                    decodeData.data[i] = 0;
                    decodeData.data[i+1] = 0;
                    decodeData.data[i+2] = 0;
                    decodeData.data[i+3] = 255;
                }
                else {
                    decodeData.data[i+3] = 0;
                }
            }
            imageCanvasContext.putImageData(decodeData, 0, 0);
        });
        image.src = event.target.result;
    });
    reader.readAsDataURL(target.files[0]);
}