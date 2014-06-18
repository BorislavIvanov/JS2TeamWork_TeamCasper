/**
 * Created by BoBBy on 05.06.14.
 */

function AssemblyLine(x, y, layer, stage, speed, controler) {
    var assemblyLine = {
        posX: x,
        posY: y,
        lineSpeed: speed,
        lineControler: controler,
        image: (function (x, y, speed, controler) {
            var lineImage = new Image();
            lineImage.src = 'Resources/AssemblyLineSprite.png';

            var lineAnimation = new Kinetic.Sprite({
                x: x,
                y: y,
                width: 650,
                height: 50,
                speed: speed,
                image: lineImage,
                name: 'line',
                animation: 'staticLine',
                animations: {
                    staticLine: [
                        // x, y, width, height
                        0, 0, 600, 33
                    ],
                    workingLine: [
                        // x, y, width, height
                        0, 0, 600, 33,
                        0, 40, 600, 33,
                        0, 84, 600, 33,
                        0, 125, 600, 33,
                        0, 168, 600, 33
                    ]
                },
                frameRate: this.lineSpeed,
                frameIndex: 0
            });

            layer.add(lineAnimation);
            stage.add(layer);
            lineAnimation.start();

            controler.image.on('click', function () {
                if (controler.isWorking === true) {
                    lineAnimation.animation('workingLine');
                } else {
                    lineAnimation.animation('staticLine');
                }
            });

            return lineAnimation;
        })(x, y, speed, controler)
    };

    return assemblyLine;
}