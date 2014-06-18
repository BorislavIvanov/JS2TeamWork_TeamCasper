function flatButton(x, y, layer, stage, rotaryBeam, isPressed) {
    var flatButton = {
        posX: x,
        posY: y,
        pressed: isPressed, //unused
        rotaryBeam: rotaryBeam,
        image: (function(x, y, rotaryBeam) {
            if (this.pressed) { //unused
                this.height = 20;
            }

            var imageObj = new Image();
            imageObj.src = 'Resources/flatButton.png';

            var innerFlatButton = new Kinetic.Image({
                x: x,
                y: y,
                width: 100,
                height: 50,
                rotaryBeam: rotaryBeam,
                name: 'flatButton',
                image: imageObj,
            });
            layer.add(innerFlatButton);
            stage.add(layer);

            return innerFlatButton;
        })(x, y, rotaryBeam)
    };
    return flatButton;
}