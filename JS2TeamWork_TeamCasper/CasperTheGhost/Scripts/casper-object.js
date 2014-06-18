/**
 * Created by micro3x on 04.06.14.
 */

function Casper(x, y, layer, stage) {
    var casper = {
        posX: x,
        posY: y,
        direction: 'right',
        multi: 0,
        speed: 2,
        inCollision: [],
        animationChange: false,
        multiplyer: -1,
        image: (function (x, y) {
            var imageObj = new Image();
            imageObj.src = "Resources/GhostSprites.png";
            var casperImage = new Kinetic.Sprite({
                x: x,
                y: y,
                image: imageObj,
                animation: 'right',
                animations: {
                    idle: [
                        0, 200, 100, 100,
                        100, 200, 100, 100,
                        200, 200, 100, 100,
                        300, 200, 100, 100,
                        400, 200, 100, 100,
                        500, 200, 100, 100,
                        600, 200, 100, 100,
                        700, 200, 100, 100,
                        800, 200, 100, 100,
                        900, 200, 100, 100,
                        1000, 200, 100, 100,
                        1100, 200, 100, 100
                    ],
                    left: [
                        0, 0, 100, 100,
                        100, 0, 100, 100,
                        200, 0, 100, 100,
                        300, 0, 100, 100,
                        400, 0, 100, 100,
                        500, 0, 100, 100,
                        600, 0, 100, 100,
                        700, 0, 100, 100,
                        800, 0, 100, 100,
                        900, 0, 100, 100,
                        1000, 0, 100, 100,
                        1100, 0, 100, 100
                    ],
                    right: [
                        0, 100, 100, 100,
                        100, 100, 100, 100,
                        200, 100, 100, 100,
                        300, 100, 100, 100,
                        400, 100, 100, 100,
                        500, 100, 100, 100,
                        600, 100, 100, 100,
                        700, 100, 100, 100,
                        800, 100, 100, 100,
                        900, 100, 100, 100,
                        1000, 100, 100, 100,
                        1100, 100, 100, 100
                    ],
                    die: [
                        0, 300, 100, 100,
                        100, 300, 100, 100,
                        200, 300, 100, 100,
                        300, 300, 100, 100,
                        400, 300, 100, 100,
                        500, 300, 100, 100,
                        600, 300, 100, 100,
                        700, 300, 100, 100,
                        800, 300, 100, 100,
                        900, 300, 100, 100,
                        1000, 300, 100, 100,
                        1100, 300, 100, 100
                    ],
                    dead: [
                        1100, 300, 100, 100,
                        1100, 300, 100, 100
                    ],

                },
                frameRate: 12,
                frameIndex: 0
            });
            layer.add(casperImage);
            stage.add(layer);
            layer.setZIndex(1);
            casperImage.start();

            var frameCounter = 0;

            var anim = new Kinetic.Animation(function () {
                casperImage.setX(casperImage.getX() + (casper.speed * casper.multi));
                casperImage.setY(casperImage.getY() + gravity);
                mainGameEngine();
            }, layer);
            anim.start();

            casperImage.on('frameIndexChange', function () {
                if (casperImage.animation() === 'die') {
                    casper.animationChange = false;
                    if (++frameCounter > 12) {
                        casperImage.animation('dead');
                        frameCounter = 0;
                        casperImage.stop();
                        anim.stop();
                        gameOver();
                    }
                }

                if (casper.animationChange) {
                    casper.animationChange = false;
                    casperImage.animation(casper.direction);
                }
            }, false);

            casperImage.on('click', function () {
                if (casper.direction == 'right') {
                    casper.move('idle');
                } else {
                    casper.move('right');
                }
                
            });
            return casperImage;
        })(x, y),
        move: function (newDirection) {

            this.direction = newDirection;
            this.multi = 0;
            if (newDirection !== 'die') {
                this.speed = 2;
            }
            if (newDirection === 'left') {
                this.multi = -1;
            }
            if (newDirection === 'right') {
                this.multi = 1;
            }
            this.animationChange = true;
        }
    };
    return casper;
}
