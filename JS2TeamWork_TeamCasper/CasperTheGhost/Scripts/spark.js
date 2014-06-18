function Spark(x, y,layer, stage) {
    var spark = {
        posX: x,
        posY: y,
        image: (function(x, y) {
            var imageObj = new Image();
            imageObj.src = 'Resources/Sparks.png';
            var ourSpark = new Kinetic.Sprite({                
                x: x,
                y: y,
                width: 130,
                height: 20,
                casperEnemy: true,

                //rotation: rotation,
                name: 'spark',
                image: imageObj,
                animation: 'idle',
                animations: {
                    idle: [
                        0, 0, 130, 20,
                        0, 21, 130, 20,
                        0, 41, 130, 20
                    ]
                },
                frameRate: 20,
                frameIndex: 0
            });

            layer.add(ourSpark);
            stage.add(layer);
            ourSpark.start();
            return ourSpark;
        })(x, y)
    };
    return spark;
}