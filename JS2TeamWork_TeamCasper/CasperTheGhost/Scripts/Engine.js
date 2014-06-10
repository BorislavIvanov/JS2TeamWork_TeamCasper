////TEST
//var drawField = new Kinetic.Stage({
//    container: 'canvas-container',
//    width: 800,
//    height: 600
//});

//var layerOne = new Kinetic.Layer();

//var rect = new Kinetic.Rect({
//    fill: 'yellowgreen',
//    stroke: '#CCCCCC',
//    x: 250,
//    y: 350,
//    width: 57,
//    height: 93
//});

//layerOne.add(rect);
//drawField.add(layerOne);
////TEST

//Global

//stage = new Kinetic.Stage({
//    container: 'canvas-container',
//    width: 800,
//    height: 600
//});



//Global
//$.getScript('Scripts/CasperObject.js');

var gravity = 2;
var collisionObjects = [];
var casper;
var rotatedBeam;


function jump(time) {
    gravity = -210;
    setTimeout(function () { gravity = 2; }, time);
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
    backgroundImage.src = '../Resources/' + image;
}

var isFlatButtonPressed = false;
var angleOfRotation = 1;
function goBabyGo() {
    var inCollision = [];
    var casperX = casper.image.getX();
    var casperY = casper.image.getY();
    if (isFlatButtonPressed) {
        if (angleOfRotation < 91) {
            rotatedBeam.rotate(-1);
            angleOfRotation++;
        }
        else {
            isFlatButtonPressed = false
        }
    }
    //if (casperX + 100 > stage.getWidth()) {
    //    casperX = stage.getWidth() - 100;
    //}
    //if (casperX < 0) {
    //    casperX = 0;
    //}
    //if (casperY + 100 > stage.getHeight()) {
    //    gravity = 1;
    //    if (casper.image.animation() !== 'dead') {
    //        casper.move('die');
    //    }
    //}
    for (var i = 0; i < collisionObjects.length; i++) {
        if (checkCollide(casperX + 100, casperY + 50, collisionObjects[i])) {
            casper.speed = 0;
            casper.image.setX(collisionObjects[i].getX() - 100);
            inCollision.push(collisionObjects[i]);
        } else {
            if (casper.direction !== 'die') {
                if (casper.speed <= 2) {
                    casper.speed += 0.03;
                }
            }

        }

        if (checkCollide(casperX + 50, casperY + 100, collisionObjects[i])) {
            var objectName = collisionObjects[i].getName();
            if (collisionObjects[i].getAttr('casperEnemy')) {
                if (casper.image.animation() !== 'dead') {
                    casper.move('die');
                }
                gravity = 0;
                casper.speed = 0;

                return;
            }
            if (objectName === 'spring') {
                casper.image.setY(collisionObjects[i].getY() - 15);
            }
            else if (objectName === 'flatButton') {
                collisionObjects[i].setHeight(25);
                collisionObjects[i].setY(200);
                rotatedBeam = collisionObjects[i].getAttr('rotaryBeam').image;
                if (!isFlatButtonPressed) {
                    var rect = new Kinetic.Rect({
                        x: 425,
                        y: 220,
                        width: 153,
                        height: 25,
                    });
                    var objLayer = new Kinetic.Layer();
                    objLayer.add(rect);
                    collisionObjects.push(rect);
                }
                isFlatButtonPressed = true;

                //if (angleOfRotation<180) {
                //    collisionObjects[i].getAttr('rotaryBeam').image.rotate(-1);
                //    angleOfRotation++;
                //}
                //if (!isFlatButtonPressed) {
                //    collisionObjects[i].getAttr('rotaryBeam').image.rotate(-90);
                //    //collisionObjects[i].getAttr('rotaryBeam').image.setX(425);
                //    //collisionObjects[i].getAttr('rotaryBeam').image.setY(220);
                //    //collisionObjects[i].getAttr('rotaryBeam').image.setWidth(153);
                //    //collisionObjects[i].getAttr('rotaryBeam').image.setHeight(25);

                //}
            }

            else if (objectName === 'line') {
                lineFlag = true;
                var spd = collisionObjects[i].getAttr('rspeed');
                casper.image.setY(collisionObjects[i].getY() - 85);
                if (collisionObjects[i].animation() === 'workingLine') {
                    casper.speed = -spd;

                }
            }

            else {
                casper.image.setY(collisionObjects[i].getY() - 100);

            }

            gravity = 0;

            inCollision.push(collisionObjects[i]);
        } else {
            if (casper.direction !== 'die') {
                gravity = 2;
            }
        }
    }
    casper.inCollision = inCollision;
    //}, 20);
}

function checkCollide(pointX, pointY, object) { // pointX, pointY belong to one rectangle, while the object variables belong to another rectangle
    var oTop = object.getY();
    if (object.getName() === 'spring') {
        oTop = oTop + 122 - object.getHeight();
    }
    if (object.getName() === 'line') {
        oTop = oTop + 15;
    }

    var oLeft = object.getX();

    var oRight = oLeft + object.getWidth();
    var oBottom = oTop + object.getHeight();
    //if (object.getName() === 'rotaryBeam') {
    //    oTop = 220;
    //    oLeft = 425;
    //    oRight = 245;
    //    oBottom = 558;
    //}
    if (pointX >= oLeft && pointX <= oRight) {
        if (pointY >= oTop && pointY <= oBottom) {
            return true;
        }
    }
    else
        return false;
};


