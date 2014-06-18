/**
 * Created by BoBBy on 07.06.14.
 */

function ControlLever(x, y, layer, stage) {
    var controlLever = {
        posX: x,
        posY: y,
        isWorking: false,
        image: (function (pX, pY) {
            var leverImage = new Image();
            leverImage.src = 'Resources/ControlLever.png';

            var leverAnimation = new Kinetic.Sprite({
                x: pX,
                y: pY,
                image: leverImage,
                animation: 'switchedOff',
                animations: {
                    // x, y, width, height
                    switchedOff: [
                        0, 0, 48, 49
                    ],
                    movingLeverON: [
                        0, 0, 48, 49,
                        47, 0, 48, 49,
                        95, 0, 48, 49,
                        144, 0, 48, 49,
                        192, 0, 48, 49
                    ],
                    switchedOn: [
                        192, 0, 48, 49
                    ],
                    movingLeverOFF: [
                        192, 0, 48, 49,
                        144, 0, 48, 49,
                        95, 0, 48, 49,
                        47, 0, 48, 49,
                        0, 0, 48, 49
                    ]
                },
                frameRate: 10,
                frameIndex: 0
            });

            layer.add(leverAnimation);
            stage.add(layer);
            leverAnimation.start();

            var frameCount = 0;

            //On click animation

            leverAnimation.on('frameIndexChange', function () {
                if (leverAnimation.animation() === 'movingLeverON') {
                    if (++frameCount > 5) {
                        leverAnimation.animation('switchedOn');
                        frameCount = 0;
                    }
                } else if (leverAnimation.animation() === 'movingLeverOFF') {
                    if (++frameCount > 5) {
                        leverAnimation.animation('switchedOff');
                        frameCount = 0;
                    }
                }
            }, false);

            leverAnimation.on('click', function () {
                if (!controlLever.isWorking) { //On click event for switching from OFF to ON
                    leverAnimation.animation('movingLeverON');
                    controlLever.isWorking = true;
                } else {
                    leverAnimation.animation('movingLeverOFF');
                    controlLever.isWorking = false;
                }
            });

            return leverAnimation;
        })(x, y)
    };

    return controlLever;
}