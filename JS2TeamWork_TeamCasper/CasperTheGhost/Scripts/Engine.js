var gravity = 2;
var collisionObjects = [];
var casper;
var scoreBox;
var initialScore;
var playerScore;
var overallScore = 0;
var rightTube;
var currentLevel;
var stage;
var paper;
var isFlatButtonPressed = false;


function scoreInput() {
    var inputForm = document.createElement('input');
    var label = document.createElement('label');
    setLabelStyle(label);
    setInputStyle(inputForm);

    document.body.appendChild(label);
    document.body.appendChild(inputForm);

    inputForm.addEventListener('keydown', function (ev) {
        if (ev.keyCode === 13) {
            var currentData = {
                name: inputForm.value,
                score: overallScore
            };
            saveToScoreBoard(currentData);
            inputForm.parentNode.removeChild(inputForm);
            label.parentNode.removeChild(label);
            showHighScores(JSON.parse(localStorage.getItem('CasperScoreBoard')).scores);
        }
    });

    function setLabelStyle(labelObj){
        labelObj.style.position = 'absolute';
        labelObj.style.top = '102px';
        labelObj.style.left = '285px';
        labelObj.style.color = 'darkgray';
        labelObj.style.fontSize = '22px';
        labelObj.innerHTML = 'Your name';
    }

    function setInputStyle(inputObj){
        inputObj.type = 'text';
        inputObj.style.width = '150px';
        inputObj.style.height = '30px';
        inputObj.autofocus = true;
        inputObj.style.position = 'absolute';
        inputObj.style.backgroundColor = 'lightgray';
        inputObj.style.border = '6px solid gray';
        inputObj.style.borderRadius = '10px';
        inputObj.style.top = '100px';
        inputObj.style.left = '400px';
    }
}

function showHighScores(totalScores) {
    var scoreTable = Raphael(200, 100, 400, 400); // new Paper

    var background = scoreTable.rect(0, 0, 400, 500);
    background.attr({
        fill: "rgba(0, 0, 0, 0.7)",
        stroke: "#fff"
    });

    var scoreLabel = scoreTable.text(210, 30, 'Players Scores :)');
    scoreLabel.attr({
        fill: "#fff",
        stroke: "#fff",
        "font-size": 40,
        "font-family": "Georgia"
    });

    var playerTextY = 110;

    for (var i = 0; i < 6; i++) {
        scoreTable.text(210, playerTextY, (i + 1) + ")" + "Name: " + totalScores[i].name + ", Scores:" + totalScores[i].score).attr({
            fill: "#0f0",
            "font-size": 30,
            "font-family": "Georgia"
        });

        playerTextY += 40;
    }
}

function saveToScoreBoard(playerData) {
    var currentScoreBoard = JSON.parse(localStorage.getItem('CasperScoreBoard'));
    if (!currentScoreBoard) {
        currentScoreBoard = {
            scores: []
        };
    }
    currentScoreBoard.scores.push(playerData);
    currentScoreBoard.scores.sort(function (a, b) { return (b.score - a.score); });
    localStorage.setItem('CasperScoreBoard', JSON.stringify(currentScoreBoard));
}

function displayCurrentScore(){
    playerScore = Math.floor(initialScore() / 1000);
    var currentScoreText = "SCORE: " + playerScore;
    if (scoreBox) {
        scoreBox.setAttr('text', currentScoreText);
    }
}

function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function () {
        return ((timeRemaining - (Date.now() - startTime)) > 0) ? ((timeRemaining - (Date.now() - startTime))) : 0;
    };
}

function mainGameEngine() {

    displayCurrentScore();

    var inCollision = [];

    if (!casper) { return; }

    var casperX = casper.image.getX();
    var casperY = casper.image.getY();

    outOfField(casperX, casperY);

    if (casper) {

        for (var i = 0; i < collisionObjects.length; i++) {

            checkCollideRight(collisionObjects[i]);

            checkCollideBottom(collisionObjects[i]);
        }
    }
    if (casper) {
        casper.inCollision = inCollision;
    }

    function checkCollideBottom(collisionObject) {
        if (checkCollide(casperX + 50, casperY + 100, collisionObject)) {
            var objectName = collisionObject.getName();

            if (collisionObject.getAttr('casperEnemy')) {
                if (casper.image.animation() !== 'dead') {
                    casper.move('die');
                }
                gravity = 0;
                casper.speed = 0;

                return;
            }

            if (objectName === 'spring') {
                casper.image.setY(collisionObject.getY() - 15);
            } else if (objectName === 'flatButton') {
                collisionObject.setHeight(25);
                collisionObject.setY(200);

                if (!isFlatButtonPressed) {
                    var rotatedBeam = collisionObject.getAttr('rotaryBeam');
                    rotatedBeam.rotateBeam();
                    isFlatButtonPressed = true;
                }
            } else if (objectName === 'line') {
                lineFlag = true;
                var spd = collisionObject.getAttr('speed');
                casper.image.setY(collisionObject.getY() - 85);
                if (collisionObject.animation() === 'workingLine') {
                    casper.speed = -spd;

                }
            } else {
                casper.image.setY(collisionObject.getY() - 100);

            }

            gravity = 0;
            inCollision.push(collisionObject);

        } else {
            if (casper.direction !== 'die') {
                gravity = 2;
            }
        }
    }

    function checkCollideRight(collisionObject) {
        if (checkCollide(casperX + 100, casperY + 50, collisionObject)) {
            casper.speed = 0;
            if (collisionObject.getName() == 'rightTube') {
                levelOver();
            }
            if (casper) {
                casper.image.setX(collisionObject.getX() - 100);
            }
            inCollision.push(collisionObject);
        } else {
            if (casper.direction !== 'die') {
                if (casper.speed <= 2) {
                    casper.speed += 0.01;
                }
            }
        }
    }
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

function checkCollide(pointX, pointY, object) { // pointX, pointY belong to one rectangle, while the object variables belong to another rectangle
    var oTop = object.getY();
    var oLeft = object.getX();
    var oRight = oLeft + object.getWidth();

    if (object.getName() === 'rightTube') {
        oLeft = oLeft + 40;
    }

    if (object.getName() === 'spring') {
        oTop = oTop + 122 - object.getHeight();
    }
    if (object.getName() === 'line') {
        oTop = oTop + 15;
    }
    var oBottom = oTop + object.getHeight();
    if (object.getName() === 'rotaryBeam') {
        oLeft = object.getAttr('rotatedX') - 30;
        oRight = oLeft + object.getHeight();
        oBottom = oTop + object.getWidth();
    }

    if (pointX >= oLeft && pointX <= oRight) {
        if (pointY >= oTop && pointY <= oBottom) {
            return true;
        }
    } else {
        return false;
    }
}

function jump(time) {
    gravity = -210;
    setTimeout(function () { gravity = 2; }, time);
}

function levelOver() {

    initialScore = function () {
        return parseInt(scoreBox.getAttr('text').substring(7)) * 1000;
    };


    overallScore += parseInt(scoreBox.getAttr('text').substring(7));
    if (currentLevel >= levels.length) {
        gameOver();
        return;
    }
    loadLevel(currentLevel + 1);
}

function gameOver() {
    casper.image.off('frameIndexChange');
    casper.image.stop();
    casper.move('idle');
    scoreInput();
}