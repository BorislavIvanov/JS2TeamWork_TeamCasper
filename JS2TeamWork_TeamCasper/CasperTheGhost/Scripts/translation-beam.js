function TranslationBeam(x, y, layer, stage, controler) {
    var translationBeam = {
        posX: x,
        posY: y,
        image: (function (x, y) {
            var imageObj = new Image();
            imageObj.src = 'Resources/beamLevel1.png';
            var beamImage = new Kinetic.Image({
                x: x,
                y: y,
                width: 25,
                height: 410,
                name: 'translationBeam',
                image: imageObj
            });
            layer.add(beamImage);
            stage.add(layer);
            return beamImage;
        })(x, y)
    };
    var isControlerClick = false;
    controler.on('click', function () {
        if (isControlerClick) {
            translationBeam.image.setY(7);
            isControlerClick = false;
        } else {
            translationBeam.image.setY(-100);
            isControlerClick = true;
        }
    });
    return translationBeam;
}