function Button(x, y, spring) {
    var button = {
        posX: x,
        posY: y,
        image: function () {
            var imageObj = new Image();
            imageObj.src = '../resources/button.png';
            var innerImage = new Kinetic.Image({
                x: this.posX,
                y: this.posY,
                image: imageObj,
            });
            
            innerImage.on('mousedown', function (evt) {
                imageObj.src = '../resources/button-mousedown.png';
                setTimeout(function () { imageObj.src = '../resources/button-hover.png'; }, 200);
                spring.image().animation('fit');
            });
            innerImage.on('mouseover', function (evt) {
                imageObj.src = '../resources/button-hover.png';
            });
            innerImage.on('mouseout', function (evt) {
                imageObj.src = '../resources/button.png';
            });
            return innerImage;
        }
    }
    return button;
}