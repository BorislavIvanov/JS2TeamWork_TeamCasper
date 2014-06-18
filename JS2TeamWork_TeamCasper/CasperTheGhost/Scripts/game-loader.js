function loadLevel(levelNumber) {
    clearLevel();
    var level = levels[levelNumber - 1]; //from Levels.js
    currentLevel = levelNumber;

    $.getScript('Scripts/casper-object.js',
        function () {
            var caserLayer = new Kinetic.Layer();
            casper = new Casper(level.casperX, level.casperY, caserLayer, stage);
            casper.move('right');
        }
    );

    loadBackground(level.background);
    var objLayer = new Kinetic.Layer();

    for (var objIndex in level.collisionObjects) {
        objectsBiulder(level.collisionObjects[objIndex], objLayer);
    }
    stage.add(objLayer);
    initialScore = createCountDown(level.initialScore);
    $.getScript('Scripts/print-score.js',
        function () {
            scoreBox = new scoreBox(45, 555, Math.floor(initialScore() / 1000), objLayer, stage);
        }
    );
}

function loadBackground(image) {
    var backgroundImage = new Image();
    var bgrdlayer = new Kinetic.Layer();

    backgroundImage.onload = function () {
        var levelBackground = new Kinetic.Image({
            x: 0,
            y: 0,
            width: stage.getWidth(),
            height: stage.getHeight(),
            image: backgroundImage
        });
        bgrdlayer.add(levelBackground);
        stage.add(bgrdlayer);
        bgrdlayer.setZIndex(0);
    };
    backgroundImage.src = 'Resources/' + image;
}

function objectsBiulder(object, objLeyer) {
    switch (object.name) {
        case 'rect':
            var rect = new Kinetic.Rect({
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height,
                fill: 'transparent'
            });
            objLeyer.add(rect);
            collisionObjects.push(rect);
            break;
            
        case 'spring':
            $.getScript('Scripts/spring.js',
                function () {
                    var thisSpring = new Spring(object.x, object.y, objLeyer, stage, object.id, object.rotation);
                    var ourSpringImage = thisSpring.image;
                    $.getScript('Scripts/button.js', function () {
                        var but = new Button(object.button.x, object.button.y, objLeyer, stage, thisSpring);
                    });
                    collisionObjects.push(ourSpringImage);
                });
            break;
            
        case 'controler':
            $.getScript('Scripts/control-lever.js',
                function () {
                    var thisControler = ControlLever(object.x, object.y, objLeyer, stage);
                    var ourControlerImage = thisControler.image;
                    $.getScript('Scripts/assembly-line.js', function () {
                        var line = AssemblyLine(object.line.x, object.line.y, objLeyer, stage, 6, thisControler);
                        collisionObjects.push(line.image);
                    });
                    collisionObjects.push(ourControlerImage);
                });
            break;
            
        case 'spark':
            $.getScript('Scripts/spark.js',
                function () {
                    var ourSpark = new Spark(object.x, object.y, objLeyer, stage);
                    var ourSparkImage = ourSpark.image;
                    collisionObjects.push(ourSparkImage);
                });
            break;
            
        case 'rotaryBeam':
            $.getScript('Scripts/rotary-beam.js',
                function () {
                    var rotaryBeam = new RotaryBeam(object.x, object.y, objLeyer, stage);
                    var rotaryBeamImage = rotaryBeam.image;
                    $.getScript('Scripts/flat-button.js', function () {
                        var ourFlatButton = flatButton(object.flatButton.x, object.flatButton.y, objLeyer, stage, rotaryBeam, false);
                        var ourFlatButtonImage = ourFlatButton.image;
                        collisionObjects.push(ourFlatButtonImage);
                    });
                    collisionObjects.push(rotaryBeamImage);
                });
            break;
            
        case 'leftTube':
            var imageObj = new Image();
            imageObj.onload = function() {
                var leftTube = new Kinetic.Image({
                    x: object.x,
                    y: object.y,
                    width: object.width,
                    heigth: 50,
                    image: imageObj
                });
                objLeyer.add(leftTube);
                stage.add(objLeyer);
            };
            imageObj.src = 'Resources/tubeLevel1Left.png';
            break;
            
        case 'rightTube':
            var imageObj = new Image();
            imageObj.onload = function() {
                rightTube = new Kinetic.Image({
                    name: 'rightTube',
                    x: object.x,
                    y: object.y,
                    width: object.width,
                    heigth: 50,
                    image: imageObj
                });
                objLeyer.add(rightTube);
                collisionObjects.push(rightTube);
                stage.add(objLeyer);
            };
            imageObj.src = 'Resources/tubeLevel1Right.png';
            break;
            
        case 'korpus':
            var imageObj = new Image();
            imageObj.onload = function() {
                var korpus = new Kinetic.Image({
                    x: object.x,
                    y: object.y,
                    width: 50,
                    height: 27,
                    image: imageObj
                });
                objLeyer.add(korpus);
                stage.add(objLeyer);
            };
            imageObj.src = 'Resources/korpus.png';
            break;
           
        case 'controlerLevel1':
            $.getScript('Scripts/control-lever.js',
                function () {
                    var thisControler = ControlLever(object.x, object.y, objLeyer, stage);
                    var ourControlerImage = thisControler.image;
                    $.getScript('Scripts/translation-beam.js', function () {
                        var beam = TranslationBeam(object.beam.x, object.beam.y, objLeyer, stage, ourControlerImage);
                        collisionObjects.push(beam.image);
                    });
                    ourControlerImage.rotate(180);
                });
            break;
        default:
            break;
    }
}

function clearLevel() {
    if (casper) {
        casper.image.off('frameIndexChange');
    }
    casper = undefined;
    collisionObjects = [];
    for (var i = 0; i < stage.children.length; i++) {
        stage.children[i].destroyChildren();
    }
    stage.destroyChildren();
    stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: 800,
        height: 600
    });
}



