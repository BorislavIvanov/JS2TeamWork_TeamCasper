/// <reference path="GameLoader.js" />
/// <reference path="CasperObject.js" />

function initGame() {
    var paper;
    paper = Raphael(8, 8, 800, 600);

    /* start page */
    paper.setStart();
    var pageFill = paper.rect(0,0, 800, 600).attr({ fill: "rgb(225, 226, 227)" }).attr({ stroke: 'none' });
    var pageBg = paper.image("../Resources/backgroundLevelW.png", 0,0, 800, 600).attr({ opacity: 0.4 });
    var titleImage = paper.image("Resources/CasperTitle.png", 250, 125, 300, 90);

    var titleAnimaton = function () {
        titleImage.attr({ y: '145' });
        titleImage.animate({ "transform": "..r-360, 400,300" }, 20000, "elastic");
        titleImage.attr({ y: '125' });
    };
    setTimeout(titleAnimaton, 500);
    var titlePage = paper.setFinish();

    /* Play button*/
    /* a rectangle with a linear gradient from light-green via green (at 50%) to light-green */
    var playShape = paper.rect(325, 50, 120, 46, 25, 35).attr({ fill: "90-#efe-#0d0:50-#6d8", "stroke-width": 5, stroke: "yellowgreen" });
    var playText = paper.text(386, 72, "PLAY");
    playText.attr({ "font-family": "Comic Sans MS", "font-size": 32, "font-weight": "800", fill: "yellow", stroke: "brown", "stroke-width": "3px" });

    /* group both the button and the text in a single Set shape we call playButton */
    var playButton = paper.set();
    playButton.push(playShape);
    playButton.push(playText);
    playButton.attr({ cursor: "pointer" });

    /* playButton - add hover/click handlers */
    playButton.mouseover(function (evt) {
        this.oGlow = playShape.glow({
            opacity: 0.85,
            color: 'lime',
            width: 70
        }); playShape.attr({ fill: "darkgreen" });
    }).mouseout(function (evt) {
        this.oGlow.remove(); playShape.attr({ fill: "90-#efe-#0d0:50-#6d8" });
    });

    playButton.click(function (evt) {
        paper.remove();
        loadLevel(1);
    });

}

function playGame(levelNumber) {
    var currentLevel = levelNumber;
    var newLevelNumber = currentLevel;

    /* Go level button */
    var levelShape = paper.rect(470, 8, 176, 40, 15, 20).attr({ fill: "90-#eee-#888:50-#444", "stroke-width": 3, stroke: "lightgrey" });
    var levelText = paper.text(560, 28,"");
    if (currentLevel === 1) {
        levelText.attr({ text: 'GO LEVEL2' });
    } else {
        levelText.attr({ text: 'GO LEVEL1' });
    }
    levelText.attr({ "font-family": "Comic Sans MS", "font-size": 28, "font-weight": "800", fill: "darkblue", stroke: "cyan", "stroke-width": "2px" });
    var levelButton = paper.set();
    levelButton.push(levelShape);
    levelButton.push(levelText);
    levelButton.attr({ cursor: "pointer" });

    /* levelButton - add hover/click handlers */
    levelButton.mouseover(function(evt){
        this.oGlow = levelShape.glow({
            opacity: 0.85,
            color: 'cyan',
            width: 25
        }); levelShape.attr({ fill: "gray" });
    }).mouseout(function (evt) {
        this.oGlow.remove(); levelShape.attr({ fill: "90-#eee-#888:50-#444" });
    });

    levelButton.click(function (event) {
        this.oGlow.remove();
        if (currentLevel === 1) {
            newLevelNumber = 2;
            levelText.attr({ text: 'GO LEVEL1' });
        } else {
            newLevelNumber = 1;
            levelText.attr({ text: 'GO LEVEL2' });
        }
        currentLevel = newLevelNumber;

        stage = new Kinetic.Stage({
            container: 'canvas-container',
            width: 800,
            height: 600
        });

        loadLevel(newLevelNumber);

        //casper.inCollision.splice(0, inCollision.length - 1);
    });

}

function gameEnd() {
    /* Game End button */
    var endShape = paper.rect(675, 8, 96, 40, 27, 40).attr({ fill: "90-#fee-#d00:50-#d68", "stroke-width": 5, stroke: "brown" });
    var endText = paper.text(723, 28, "END");
    endText.attr({ "font-family": "Comic Sans MS", "font-size": 28, "font-weight": "800", fill: "yellow", stroke: "brown", "stroke-width": "3px" });
    var endButton = paper.set();
    endButton.push(endShape);
    endButton.push(endText);
    endButton.attr({ cursor: "pointer" });

    //  endButton - add hover/click handlers
    endButton.mouseover(function (evt) {
        this.oGlow = endShape.glow({
            opacity: 0.85,
            color: 'magenta',
            width: 25
        }); endShape.attr({ fill: "purple" });
    }).mouseout(function (evt) {
        this.oGlow.remove(); endShape.attr({ fill: "90-#fee-#d00:50-#d68" });
    });

    endButton.click(function (evt) {
        endButton.hide();
        displayScores();
    });
}

function displayScores() {
    /* Current scores display */
    var currentTimeRemaining = createCountDown(level.initialScore);
    var timeShape = paper.rect(30, 8, 88, 40, 5, 8).attr({ fill: "yellowgreen"});
    var timeShapeText = paper.text(74, 28, 'TIME:');
    timeShapeText.attr({ "font-family": "Comic Sans MS", "font-size": 24, "font-weight": "800", fill: "cyan", stroke: "blue", "stroke-width": "2px" });


    
 //   var timeText = paper.text(210, 8, 'alabala');
 //   timeText.attr({ "font-family": "Consolas", "font-size": 24, "font-weight": "800", fill: "red", stroke: "brown", "stroke-width": "2px" });



}



