﻿

function Handle(x, y, layer, stage, id) {
    var handle = {
        
        posX: x,
        posY: y,
        width: 53,
        height:53,
        image: (function (x, y) {
            var imageObj = new Image();
            imageObj.src = '../resources/ControlLever.png';
            var innerSpring = new Kinetic.Sprite({
                id: id,
                x: x,
                y: y + 53,
                width: 53,
                height: 53,
                name: 'handle',
                image: imageObj,
                animation: 'idle',
                animations: {
                    idle: [
                      // x, y, width, height (4 frames)
                      0, 0, 53, 53,
                      //103, 0, 101, 122,
                    ],
                    stretch: [
                      // x, y, width, height (3 frames)
                      //0, 2, 100, 60,
                      53, 0, 53, 53,
                      109, 0, 53, 53,
                      162, 0, 53, 53,
                      215, 0, 53, 53,
                    ]
                },
                frameRate: 20,
                frameIndex: 0
            });

            layer.add(innerSpring);
            stage.add(layer);


            //stage.add(layer);
            // start sprite animation
            innerSpring.start();

            var frameCount = 0;
            innerSpring.on('frameIndexChange', function (evt) {

                if (innerSpring.animation() === 'stretch') {
                    //spring.height += 40;
                    //if (frameCount===0) {
                    //    gravity = -150;
                    //}
                    //if (frameCount===1) {
                    //    gravity = 2;
                    //}
                    //spring.posY -= 40;
                   if (++frameCount > 3) {
                        innerSpring.animation('idle');
                        frameCount = 0;
                        spring.posY = y + 82;
                        spring.height = 57;
                    }
                }
            }, false);
            return innerSpring;
        })(x, y)
    }
    return spring;
}