var gravity = 2;
var collisionObjects = [];
var casper;
var rotatedBeam;
var scoreBox;
var initialScore;
var playerScore;
var rightTube;

function scoreInput() {
    var inputForm = document.createElement('input');
    var label = document.createElement('label');
    label.style.position = 'absolute';
    label.style.top = '102px';
    label.style.left = '285px';
    label.style.color = 'darkgray';
    label.style.fontSize = '22px';
    label.innerHTML = 'Your name';
    inputForm.type = 'text';
    inputForm.style.width = '150px';
    inputForm.style.height = '30px';
    inputForm.autofocus = true;
    inputForm.style.position = 'absolute';
    inputForm.style.backgroundColor = 'lightgray';
    inputForm.style.border = '6px solid gray';
    inputForm.style.borderRadius = '10px';
    inputForm.style.top = '100px';
    inputForm.style.left = '400px';
    document.body.appendChild(label);
    document.body.appendChild(inputForm);
    inputForm.addEventListener('keydown', function (ev) {
        if (ev.keyCode === 13) {
            var currentData = {
                name: inputForm.value,
                score: scoreBox.getAttr('text')
            }
            saveToScoreBoard(currentData)
            inputForm.parentNode.removeChild(inputForm);
            label.parentNode.removeChild(label);
            //stage = new Kinetic.Stage({
            //    container: 'canvas-container',
            //    width: 800,
            //    height: 600
            //});
        }
    })
}

function gameOver() {
    scoreInput();
}

function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function () {
        return timeRemaining - (Date.now() - startTime);
    }
}

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

function saveToScoreBoard(playerData) {
    var currentScoreBoard = JSON.parse(localStorage.getItem('CasperScoreBoard'));
    if (!currentScoreBoard) {
        currentScoreBoard = {
            scores: []
        }
    }
    currentScoreBoard.scores.push(playerData);
    currentScoreBoard.scores.sort(function (a, b) { return (b.score - a.score) });
    localStorage.setItem('CasperScoreBoard', JSON.stringify(currentScoreBoard));
}

function outOfField(x, y) {
    if (x + 100 > stage.getWidth()) {
        casper.image.setX(stage.getWidth() - 100);
    }
    if (x < 0) {
        casper.image.setX(0);
    }
    if (y + 100 > stage.getHeight()) {
        gravity = 1;
        if (casper.image.animation() !== 'dead') {
            casper.move('die');
        }
    }

}

var isFlatButtonPressed = false;
var angleOfRotation = 1;
function goBabyGo() {
    playerScore = Math.floor(initialScore() / 1000);
    scoreBox.setAttr('text', playerScore);
    var inCollision = [];
    var casperX = casper.image.getX();
    var casperY = casper.image.getY();
    outOfField(casperX, casperY);

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

                if (!isFlatButtonPressed) {
                    var rotatedBeam = collisionObjects[i].getAttr('rotaryBeam');
                    rotatedBeam.rotateBeam();
                    isFlatButtonPressed = true;
                }
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

}

function checkCollide(pointX, pointY, object) { // pointX, pointY belong to one rectangle, while the object variables belong to another rectangle
    var oTop = object.getY();
    var oLeft = object.getX();
    var oRight = oLeft + object.getWidth();
    var oBottom = oTop + object.getHeight();

    if (object.getName() === 'spring') {
        oTop = oTop + 122 - object.getHeight();
    }
    if (object.getName() === 'line') {
        oTop = oTop + 15;
    }
    if (object.getName() === 'rotaryBeam') {
        oLeft = object.getAttr('rotatedX') - 30;
        oRight = oLeft + object.getHeight();
        oBottom = oTop + object.getWidth();
    }

    if (pointX >= oLeft && pointX <= oRight) {
        if (pointY >= oTop && pointY <= oBottom) {
            return true;
        }
    }
    else
        return false;
};


