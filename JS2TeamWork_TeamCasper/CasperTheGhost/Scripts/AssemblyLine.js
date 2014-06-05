/**
 * Created by BoBBy on 05.06.14.
 */

function AssemblyLine(layer, x, y, speed) {
    var assemblyLine = {
        posX: x,
        posY: y,
        lineSpeed: speed,
        init: function () {
            var lineImage = new Image();
            lineImage.src = '/Resources/AssemblyLineSprite.png';

            var lineAnimation = new Kinetic.Sprite({
                x: assemblyLine.posX,
                y: assemblyLine.posY,
                image: lineImage,
                animation: 'workingLine',
                animations: {
                    staticLine: [
                        // x, y, width, height
                        0, 0, 799, 43
                    ],
                    workingLine: [
                        // x, y, width, height
                        0, 0, 799, 43,
                        0, 54, 799, 43,
                        0, 112, 799, 43,
                        0, 167, 799, 43,
                        0, 225, 799, 43
                    ],
                },
                frameRate: assemblyLine.lineSpeed,
                frameIndex: 0
            });

            layer.add(lineAnimation);
            lineAnimation.start();

            return lineAnimation;
        }
    }

    assemblyLine.init();
    return assemblyLine;
}