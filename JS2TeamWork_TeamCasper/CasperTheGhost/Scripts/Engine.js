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


function jump(time) {
    gravity = -150;
    setTimeout(function () { gravity = 2; }, time);
}

function loadBackground(image) {
    var backgroundImage = new Image();
    var bgrdlayer = new Kinetic.Layer();
    
    backgroundImage.onload = function() {
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

function goBabyGo() {
    var inCollision = [];
    for (var i = 0; i < collisionObjects.length; i++) {
        //if ((s.posY+100)>496&&(s.posY+100<510)) {
        //    console.log('casperY+100' + (s.posY+100));
        //    console.log('springY' + collisionObjects[i].getY());
        //}
        var casperX = casper.image.getX();
        var casperY = casper.image.getY();
        if (checkCollide(casperX + 100, casperY + 50, collisionObjects[i])) {
            casper.speed = 0;
            casper.image.setX(collisionObjects[i].getX() - 100);
            inCollision.push(collisionObjects[i]);
        } else {
            casper.speed = 2;
        }

        if (checkCollide(casperX + 50, casperY + 100, collisionObjects[i])) {


            if (collisionObjects[i].getName() == 'spring') {
                casper.image.setY(collisionObjects[i].getY() - 30);
            } else {
                casper.image.setY(collisionObjects[i].getY() - 100);
            }

            gravity = 0;
            inCollision.push(collisionObjects[i]);
        } else {
            gravity = 2;
        }
    }
    casper.inCollision = inCollision;
    //}, 20);
}

function checkCollide(pointX, pointY, object) { // pointX, pointY belong to one rectangle, while the object variables belong to another rectangle
    var oTop = object.getY();
    if (object.getId() === 'spring1') {
        oTop = oTop + 122 - object.getHeight();
    }
    var oLeft = object.getX();
    var oRight = oLeft + object.getWidth();
    var oBottom = oTop + object.getHeight();

    if (pointX >= oLeft && pointX <= oRight) {
        if (pointY >= oTop && pointY <= oBottom) {
            return true;
        }
    }
    else
        return false;
};
    

