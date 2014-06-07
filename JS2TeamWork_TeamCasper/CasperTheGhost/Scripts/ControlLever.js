/**
 * Created by BoBBy on 07.06.14.
 */

function ControlLever(x, y, layer, stage) {
    var controlLever = {
        posX: x,
        posY: y,
        init: function () {
            var leverImage = new Image();
            leverImage.src = '/Resources/ControlLever.png';

            var leverAnimation = new Kinetic.Sprite({
                x: controlLever.posX,
                y: controlLever.posY,
                image: leverImage,
                animation: 'movingLever',
                animations: {
                    staticLever: [
                        // x, y, width, height
                        0, 0, 161, 161
                    ],
                    movingLever: [
                        // x, y, width, height
                        0, 0, 161, 161,
                        156, 0, 161, 161,
                        316, 0, 161, 161,
                        478, 0, 161, 161,
                        639, 0, 161, 161
                    ],
                },
                frameRate: 10,
                frameIndex: 0
            });

            layer.add(leverAnimation);
            stage.add(layer);
            leverAnimation.start();

            return leverAnimation;
        }
    }

    controlLever.init();
    return controlLever;
}