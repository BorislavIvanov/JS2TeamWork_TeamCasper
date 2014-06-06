/**
 * Created by micro3x on 04.06.14.
 */

function Casper(x, y, layer, stage) {
    var casper = {
        posX: x,
        posY: y,
        direction: 'idle',
        multi: 0,
        speed: 2,
        inCollision: [],
        animationChange: false,
        multiplyer: -1,
        image: (function (x, y) {
            var imageObj = new Image();
            imageObj.src = "../resources/GhostSprites.png";
            //imageObj.onload = animate();
            var blob = new Kinetic.Sprite({
                x: x,
                y: y,
                //fill:'black',
                image: imageObj,
                animation: 'idle',
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
                    ]
                },
                frameRate: 12,
                frameIndex: 0
            });
            layer.add(blob);
            stage.add(layer);
            blob.start();

            var anim = new Kinetic.Animation(function (frame) {
                blob.setX(blob.getX() + (casper.speed * casper.multi));
                blob.setY(blob.getY() +  gravity);
                goBabyGo();
                //casper.posX = blob.getX();
                //casper.posY = blob.getY();
                
            }, layer);
            anim.start();

            blob.on('frameIndexChange', function (evt) {
                if (casper.animationChange) {
                    casper.animationChange = false;
                    blob.animation(casper.direction);
                }
            }, false);
            return blob;
        })(x,y),
        move: function (newDirection) {

            this.direction = newDirection;
            this.multi = 0;
            this.speed = 2;
            if (newDirection == 'left') {
                this.multi = -1;
            }
            if (newDirection == 'right') {
                this.multi = 1;
            }
            this.animationChange = true;
        }
    };
    //casper.init();
    return casper;
}
