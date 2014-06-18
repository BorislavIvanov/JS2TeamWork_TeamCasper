function RotaryBeam(x, y, layer, stage) {
    var rotaryBeam = {
        posX: x,
        posY: y,
        image: (function(x, y) {
            var imageObj = new Image();
            imageObj.src = 'Resources/beamLevel2.png';
            var beamImage = new Kinetic.Image({
                x: x,
                y: y,
                width: 25,
                height: 153,
                rotatedX: x,
                rotatedY: y,
                name: 'rotaryBeam',
                image: imageObj,
                offset: { x: 25, y: 153 }
            });

            layer.add(beamImage);
            stage.add(layer);
            return beamImage;
        })(x, y),

        rotateBeam: function() {
            var frames = 0;
            var speed = 3;
            var angleOfRotation = 1;
            var anim = new Kinetic.Animation(function() {
                var degToRad = function(angle) {
                    return angle * (Math.PI / 180);
                };

                var calcRotatedPos = function(x, y, rotationInRad) {
                    rotaryBeam.image.setAttr('rotatedX', x + rotaryBeam.image.getHeight() * Math.cos(rotationInRad));
                    rotaryBeam.image.setAttr('rotatedY', y + rotaryBeam.image.getHeight() * Math.sin(rotationInRad));
                };
                if (angleOfRotation < 91) {
                    frames += 1;
                    if (frames < speed) {
                        return;
                    }
                    frames = 0;
                    rotaryBeam.image.rotate(-1);
                    angleOfRotation++;
                    var angle = degToRad(rotaryBeam.image.getAttr('rotation') + 270);
                    calcRotatedPos(rotaryBeam.image.getX() + rotaryBeam.image.getWidth(), rotaryBeam.image.getY() + rotaryBeam.image.getHeight(), angle);
                } else {
                    anim.stop();
                }
            }, layer);
            anim.start();
        }
    };
    return rotaryBeam;
}