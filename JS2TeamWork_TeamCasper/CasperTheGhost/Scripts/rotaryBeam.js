function beamLevelTwo(x, y, layer, stage) {
    var rotaryBeam = {
        posX: x,
        posY: y,
        image: (function (x, y) {
            var imageObj = new Image();
            imageObj.src = '/resources/beamLevel2.png';
            var beamImage = new Kinetic.Image({
                x: x,
                y: y,
                width: 25,
                height: 153,
                name: 'rotaryBeam',
                image: imageObj,
                offset: { x: 25, y: 153 }
            })
            layer.add(beamImage);
            stage.add(layer);
            return beamImage;
        })(x, y)
    }
    return rotaryBeam;
}