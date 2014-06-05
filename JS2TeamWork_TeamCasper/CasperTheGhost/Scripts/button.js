function Button(x, y) {
    var button = {
        posX: x,
        posY: y,
        image: function () {
            var imageObj = new Image();
            imageObj.src = '../resources/button.png';
            var innerImage = new Kinetic.Image({
                x: this.posX,
                y: this.posY,
                image: imageObj,
            });
            return innerImage;
        }
    }
    return button;
}