/// <reference path="spring.js" />
/// <reference path="tubes.js" />
/// <reference path="tubes.js" />
/// <reference path="rotaryBeam.js" />



function loadLevel(levelNumber) {
    var level = levels[levelNumber - 1]; //from Levels.js
    assebliesLoad(level.scriptsToLoad);

    $.getScript('Scripts/CasperObject.js',
        function () {
            var caserLayer = new Kinetic.Layer();
            casper = Casper(100, 100, caserLayer, stage);
        }
    );
    loadBackground(level.background);
    var objLayer = new Kinetic.Layer();

    for (var objIndex in level.collisionObjects) {
        objectsBiulder(level.collisionObjects[objIndex], objLayer);
    }
    stage.add(objLayer);
    initialScore = createCountDown(level.initialScore);
    $.getScript('Scripts/printScore.js',
        function () {
            scoreBox = new scoreBox(45, 480, Math.floor(initialScore() / 1000), objLayer, stage);
        }
    );
}


function assebliesLoad(jsFilesToAddInDOM) {
    for (var assemblyIndex = 0; assemblyIndex < jsFilesToAddInDOM.length; assemblyIndex++) {
        var fileref = document.createElement('script');
        fileref.setAttribute("src", 'Scripts/' + jsFilesToAddInDOM[assemblyIndex]);
        document.getElementsByTagName("body")[0].appendChild(fileref);
    }
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
                    var thisSpring = Spring(object.x, object.y, objLeyer, stage, object.id, object.rotation);
                    var ourSpringImage = thisSpring.image.rotate(0);
                    $.getScript('Scripts/button.js', function () {
                        var but = Button(object.button.x, object.button.y, objLeyer, stage, thisSpring);
                    });
                    collisionObjects.push(ourSpringImage);
                });
            break;
        case 'controler':
            $.getScript('Scripts/ControlLever.js',
                function () {
                    var thisControler = ControlLever(object.x, object.y, objLeyer, stage);
                    var ourControlerImage = thisControler.image;
                    $.getScript('Scripts/AssemblyLine.js', function () {
                        var line = AssemblyLine(object.line.x, object.line.y, objLeyer, stage, 6, thisControler);
                        collisionObjects.push(line.image);
                    });
                    collisionObjects.push(ourControlerImage);
                });
            break;
        case 'spark':
            $.getScript('Scripts/SampleCasperEnemy.js',
                function () {
                    var ourSpark = new sampleCasperEnemy(object.x, object.y, object.width, object.height, objLeyer, stage);
                    var ourSparkImage = ourSpark.image;
                    collisionObjects.push(ourSparkImage);
                });
            break;
        case 'rotaryBeam':
            $.getScript('Scripts/rotaryBeam.js',
                function () {
                    var rotaryBeam = new beamLevelTwo(object.x, object.y, objLeyer, stage);
                    var rotaryBeamImage = rotaryBeam.image;
                    $.getScript('Scripts/flatButton.js', function () {
                        var ourFlatButton = flatButton(object.flatButton.x, object.flatButton.y, objLeyer, stage, rotaryBeam, false);
                        var ourFlatButtonImage = ourFlatButton.image;
                        collisionObjects.push(ourFlatButtonImage);
                    });
                    collisionObjects.push(rotaryBeamImage);
                });
            break;
        case 'leftTube':
            var imageObj = new Image();
            imageObj.onload = function () {
                var leftTube = new Kinetic.Image({
                    x: object.x,
                    y: object.y,
                    width: 75,
                    hegith: 50,
                    image: imageObj
                })
                objLeyer.add(leftTube);
                stage.add(objLeyer);
            }
            imageObj.src = 'Resources/tubeLevel1Left.png';
            break;
        case 'rightTube':
            var imageObj = new Image();
            imageObj.onload = function () {
                rightTube = new Kinetic.Image({
                    x: object.x,
                    y: object.y,
                    width: 100,
                    hegith: 50,
                    image: imageObj
                })
                objLeyer.add(rightTube);
                stage.add(objLeyer);
            }
            imageObj.src = 'Resources/tubeLevel1Right.png';
            break;
        default:
            break;
    }
}



