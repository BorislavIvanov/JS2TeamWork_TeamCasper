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
            if (casper.direction !== 'die') {
                casper.speed = 2;
            }

        }

        if (checkCollide(casperX + 50, casperY + 100, collisionObjects[i])) {
            var objectName = collisionObjects[i].getName();
            if (collisionObjects[i].casperEnemy) {
                casper.move('die');
                break;
            }
            if (objectName === 'spring') {
                casper.image.setY(collisionObjects[i].getY() - 15);
            }
            else if (objectName === 'flatButton') {
                //collisionObjects.splice(i, 1);
                //collisionObject[i].height=20;
            }

            else if (objectName === 'line') {
                console.log(collisionObjects[i].speed);

                casper.image.setY(collisionObjects[i].getY() - 85);
                if (collisionObjects[i].getAnimation() === 'workingLine') {
                    casper.speed = 2 - collisionObjects[i].speed;
                }

            }

            else {
                casper.image.setY(collisionObjects[i].getY() - 100);
            }


            //else if (collisionObjects[i].getName() === 'line') {
            //    casper.image.setY(collisionObjects[i].getY() - 20);
            //}

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

    if (pointX >= oLeft && pointX <= oRight) {
        if (pointY >= oTop && pointY <= oBottom) {
            return true;
        }
    }
    else
        return false;
};


