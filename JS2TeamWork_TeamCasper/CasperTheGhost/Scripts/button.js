﻿function Button(x, y, layer, stage, spring) {
    var button = {
        posX: x,
        posY: y,
        getImage: function () {
            var imageObj = new Image();
            imageObj.onload = function () {
                var innerImage = new Kinetic.Image({
                    x: button.posX,
                    y: button.posY,
                    image: imageObj,
                });
                checkForEvents(innerImage)
                layer.add(innerImage);
                stage.add(layer);
            }

            imageObj.src = '../resources/button.png';

            function checkForEvents(buttonImage) {
                buttonImage.on('mousedown', function (evt) {

                    imageObj.src = '../resources/button-mousedown.png';
                    var onSpring;
                    //for (var i = 0; i < s.inCollision.length; i++) {
                    //    console.log(s.inCollision[i].id);
                    //}
                    for (var elementIndex in casper.inCollision) {
                        var collisionElement = casper.inCollision[elementIndex].getId();
                        if (collisionElement) {
                            if (collisionElement === spring.image.getId()) {
                                onSpring = true;
                            }
                        }
                    }
                    if (onSpring) {
                        jump(1200);
                    }

                    setTimeout(function () { imageObj.src = '../resources/button-hover.png'; }, 100);
                    //layer.removeChildren();
                    //layer.add(buttonImage);
                    spring.image.animation('stretch');




                    //spring.getImage().start();
                });
                buttonImage.on('mouseover', function (evt) {
                    imageObj.src = '../resources/button-hover.png';
                });
                buttonImage.on('mouseout', function (evt) {
                    imageObj.src = '../resources/button.png';
                });
            }
            //return innerImage;
        }
    }
    button.getImage();
    return button;
}