function flatButton(x, y, layer, pressed) {
    var flatButton = {
        posX: x,
        posY: y,
        pressed: pressed,
        width: 100,
        height: 35,
        image: function () {
            var imageObj = new Image();
            imageObj.src = '../resources/flatButton.png';
            if (this.pressed) {
                this.height = 20;
            }
            var innerImage = new Kinetic.Image({
                x: flatButton.posX,
                y: flatButton.posY,
                width: flatButton.width,
                height: flatButton.height,
                image: imageObj,
            });
            
            //innerImage.on('mousedown', function (evt) {
            //    //imageObj.src = '../resources/button-mousedown.png';
            //    //setTimeout(function () { imageObj.src = '../resources/button-hover.png'; }, 200);
            //    //layer.removeChildren();
            //    //layer.add(innerImage);
            //    //spring.image().animation('stretch');
            //});
            //innerImage.on('mouseover', function (evt) {
            //    //imageObj.src = '../resources/button-hover.png';
            //});
            //innerImage.on('mouseout', function (evt) {
            //    //imageObj.src = '../resources/button.png';
            //});
            return innerImage;
        }
    }
    return flatButton;
}