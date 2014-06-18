function Button(x, y, layer, stage, spring) {
    var button = {
        posX: x,
        posY: y,
        image: (function() {
            var imageObj = new Image();
            imageObj.onload = function() {
                var innerImage = new Kinetic.Image({
                    x: button.posX,
                    y: button.posY,
                    image: imageObj
                });
                checkForEvents(innerImage);
                layer.add(innerImage);
                stage.add(layer);
            };

            imageObj.src = 'Resources/button.png';

            function checkForEvents(buttonImage) {
                buttonImage.on('mousedown', function() {

                    imageObj.src = 'Resources/button-mousedown.png';
                    var onSpring;
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

                    setTimeout(function() { imageObj.src = 'Resources/button-hover.png'; }, 100);
                    spring.image.animation('stretch');
                });
                buttonImage.on('mouseover', function() {
                    imageObj.src = 'Resources/button-hover.png';
                });
                buttonImage.on('mouseout', function() {
                    imageObj.src = 'Resources/button.png';
                });
            }
        })()
    };

    return button;
}