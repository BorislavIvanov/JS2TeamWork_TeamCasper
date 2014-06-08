/**
 * Created by BoBBy on 05.06.14.
 */

function AssemblyLine(x, y, layer, stage, speed, controler) {
    var assemblyLine = {
        posX: x,
        posY: y,
        lineSpeed: speed,
        lineControler: controler,
        init: function () {
            var lineImage = new Image();
            lineImage.src = '/Resources/AssemblyLineSprite.png';

            var lineAnimation = new Kinetic.Sprite({
                x: assemblyLine.posX,
                y: assemblyLine.posY,
                image: lineImage,
                animation: 'staticLine',
                animations: {
                    staticLine: [
                        // x, y, width, height
                        0, 0, 799, 43,
                        0, 0, 799, 43
                    ],
                    workingLine: [
                        // x, y, width, height
                        0, 0, 799, 43,
                        0, 54, 799, 43,
                        0, 112, 799, 43,
                        0, 167, 799, 43,
                        0, 225, 799, 43
                    ]
                },
                frameRate: assemblyLine.lineSpeed,
                frameIndex: 0
            });

            layer.add(lineAnimation);
            stage.add(layer);
            lineAnimation.start();

            assemblyLine.lineControler.image.on('click', function (e) {
                if (assemblyLine.lineControler.isWorking == true) {
                    lineAnimation.animation('workingLine');
                }
                else {
                    lineAnimation.animation('staticLine');
                }
            })

            return lineAnimation;
        }
    }

    assemblyLine.init();
    return assemblyLine;
}