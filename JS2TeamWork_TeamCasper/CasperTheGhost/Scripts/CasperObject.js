/**
 * Created by micro3x on 04.06.14.
 */

function Casper(x, y, stage){
    this.posX = x;
    this.posY = y;
    var layer = new Kinetic.Layer();
    this.layer = layer;
    this.moveDirection = 'idle';


    this.move = function(direction){animation.dir = direction; animation.change = true; };

    var imageObj = new Image();
    var animation;

    imageObj.onload = (function(){animation = new animate(x, y, 'idle')})();
    function animate(px,py,md){
        this.dir = md;
        this.change = false;
        var blob = new Kinetic.Sprite({
            x: px,
            y: py,
            image: imageObj,
            animation: this.dir,
            animations: {
                idle: [
                    0,200,100,100,
                    100,200,100,100,
                    200,200,100,100,
                    300,200,100,100,
                    400,200,100,100,
                    500,200,100,100,
                    600,200,100,100,
                    700,200,100,100,
                    800,200,100,100,
                    900,200,100,100,
                    1000,200,100,100,
                    1100,200,100,100
                ],
                left : [
                    0,0,100,100,
                    100,0,100,100,
                    200,0,100,100,
                    300,0,100,100,
                    400,0,100,100,
                    500,0,100,100,
                    600,0,100,100,
                    700,0,100,100,
                    800,0,100,100,
                    900,0,100,100,
                    1000,0,100,100,
                    1100,0,100,100
                ],
                right: [
                    0,100,100,100,
                    100,100,100,100,
                    200,100,100,100,
                    300,100,100,100,
                    400,100,100,100,
                    500,100,100,100,
                    600,100,100,100,
                    700,100,100,100,
                    800,100,100,100,
                    900,100,100,100,
                    1000,100,100,100,
                    1100,100,100,100
                ]
            },
            frameRate: 12,
            frameIndex: 0
        });
        layer.add(blob);
        stage.add(layer);
        blob.start();

        blob.on('frameIndexChange',function(evt){
            if(animation.change){
                animation.change = false;
                blob.animation(animation.dir);
            }
        }, false)
    }





    imageObj.src = 'Resources/GhostSprites.png';
}