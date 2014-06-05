function Button(x, y,spring) {
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
            innerImage.on('click', function (evt) {
                console.log('you clicked me!')
                spring.image().animation ( 'fit');
            });
            return innerImage;
        }
    }
    return button;
}