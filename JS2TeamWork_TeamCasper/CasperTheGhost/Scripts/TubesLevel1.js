function TubesLevel1() {
    var tubesLevel1 = {
        posX: x,
        posY: y,
        lineSpeed: speed,
       
        image: (function (x, y, speed) {
            var lineImage = new Image();
            lineImage.src = 'SuperMario.png';

            var lineAnimation = new Kinetic.Sprite({
                x: x,
                y: y,
                width: 650,
                height: 120,
                rspeed: speed,
                getSpeed: function () { return this.rspeed; },
                image: lineImage,
                name: 'line',
                animation: 'staticLine',
                animations: {
                    staticLine: [
                        // x, y, width, height
                        40, 0, 30, 70
                    ],
                    workingLine: [
                        // x, y, width, height
                        35, 0, 35, 70,
                        70, 0, 50, 70,
                        120, 0, 50, 70,
                        170, 0, 40, 70,
                        210, 0, 40, 70,
                        250, 0, 50, 70,
                        300, 0, 40, 70,
                        340, 0, 25, 70,
                        365, 0, 35, 70
                    ]
                },
                frameRate: this.lineSpeed,
                frameIndex: 0
            });

            layer.add(lineAnimation);
            stage.add(layer);
            lineAnimation.start();
            var buttonImage = new Image();
            var button = new Kinetic.Image({
                x: 100,
                y: 60,
                image: buttonImage,
                width: 36,
                height: 36,

            })
            buttonImage.src = "Button.png"

            layer.add(button);
            button.on('click', function (e) {
                if (lineAnimation.animation()==='workingLine') {
                    lineAnimation.animation('staticLine');
                    console.log (button.on)
                }
                else{
                    lineAnimation.animation('workingLine');
                    console.log(lineAnimation.animation)
                }
                    })
            return lineAnimation;
        })(x, y, speed)
    }
    return tubesLevel1;
}