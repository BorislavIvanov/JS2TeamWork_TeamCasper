function flatButton(x, y, layer, stage, isPressed) {
    var flatButton = {
        posX: x,
        posY: y,
        pressed: isPressed,
        width: 100,
        height: 35,
        getImage: function () {
            if (this.pressed) {
                this.height = 20;
            }

            var imageObj = new Image();
            imageObj.onload = function () {
                var innerFlatButton = new Kinetic.Image({
                    x: flatButton.posX,
                    y: flatButton.posY,
                    width: flatButton.width,
                    height: flatButton.height,
                    image: imageObj,
                });
                layer.add(innerFlatButton);
                stage.add(layer);
            }

            imageObj.src = '../resources/flatButton.png';

            //innerImage.on('mousedown', function (evt) {
            //    //imageObj.src = '../resources/button-mousedown.png';
            //    //setTimeout(function () { imageObj.src = '../resources/button-hover.png'; }, 200);
            //    //layer.removeChildren();
            //    //layer.add(innerImage);
            //    //spring.image().animation('stretch');
            //});
            //innerImage.on('mouseover', function (evt) {
            //    //imageObj.src = '../resources/button-hover.png';
            //});
            //innerImage.on('mouseout', function (evt) {
            //    //imageObj.src = '../resources/button.png';
            //});
            //return innerFlatButton;
        }
    }
    flatButton.getImage();
    return flatButton;
}