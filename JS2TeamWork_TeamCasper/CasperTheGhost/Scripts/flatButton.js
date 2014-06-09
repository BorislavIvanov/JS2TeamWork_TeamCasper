function flatButton(x, y, layer, stage, isPressed) {
    var flatButton = {
        posX: x,
        posY: y,
        pressed: isPressed,

        image: (function (x, y) {
            if (this.pressed) {
                this.height = 20;
            }

            var imageObj = new Image();
            imageObj.src = '../resources/flatButton.png';

            var innerFlatButton = new Kinetic.Image({
                x: x,
                y: y,
                width: 100,
                height: 50,
                name: 'flatButton',
                image: imageObj,
            });
            layer.add(innerFlatButton);
            stage.add(layer);

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
            return innerFlatButton;
        })(x, y)
    }
    //flatButton.getImage();
    return flatButton;
}