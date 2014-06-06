function Spring(layer,x, y) {
    var spring = {
        posX: x,
        posY: y,
        getImage: function () {
            var imageObj = new Image();
            imageObj.src = '../resources/spring.png';

            var innerSpring = new Kinetic.Sprite({
                x: this.posX,
                y: this.posY,
                image: imageObj,
                animation: 'idle',
                animations: {
                    idle: [
                      // x, y, width, height (4 frames)
                      0, 0, 101, 122,
                      //103, 0, 101, 122,
                    ],
                    stretch: [
                      // x, y, width, height (3 frames)
                      //0, 2, 100, 60,
                      104, 0, 101, 122,
                      207, 0, 101, 122,
                      311, 0, 101, 122,
                    ]
                },
                frameRate: 20,
                frameIndex: 0
            });

            layer.add(innerSpring);

            //stage.add(layer);
            // start sprite animation
            innerSpring.start();

            var frameCount = 0;

            innerSpring.on('frameIndexChange', function (evt) {
                if (innerSpring.animation() === 'stretch' && ++frameCount > 3) {
                    innerSpring.animation('idle');
                    frameCount = 0;
                }
            });
            return innerSpring;
        }
    }
    return spring;
}