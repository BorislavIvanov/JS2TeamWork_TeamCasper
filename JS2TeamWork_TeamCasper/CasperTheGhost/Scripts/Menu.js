var paper, set;
var levelNumber = 1;
var playing = false;
showMenu();


function showMenu() {
    paper = new Raphael(8, 8, 800, 600);
    paper.setStart();

    var pageFill = paper.rect(8, 8, 800, 600).attr({ fill: "rgb(225, 226, 227)" }).attr({ stroke: 'none' });
    var pageBg = paper.image("../Resources/backgroundLevelW.png", 8, 8, 800, 600).attr({ opacity: 0.2 });

    var titleImage = paper.image("Resources/CasperTitle.png", 250, 215, 300, 90);

    var titleAnimaton = function() {
        titleImage.animate({ "transform": "..r-360, 400,300" }, 20000, "elastic");
    };
    setTimeout(titleAnimaton, 500);

    var titlePage = paper.setFinish();


    /* a rectangle with a linear gradient from light-green via green (at 50%) to light-green */
    var playShape = paper.rect(325, 55, 120, 70, 35, 45).attr({ fill: "90-#efe-#0d0:50-#6d8", "stroke-width": 5, stroke: "lightgreen" });
    var playText;
    if (playing) {
        playText = paper.text(386, 88, "NEXT");
    } else {
        playText = paper.text(386, 88, "PLAY");
    }


    playText.attr({ "font-family": "Comic Sans MS", "font-size": 32, "font-weight": "800", fill: "yellow", stroke: "brown", "stroke-width": "3px" });

    /* group both the button and the text in a single Set shape we call playButton */
    var playButton = paper.set();
    playButton.push(playShape);
    playButton.push(playText);
    playButton.attr({ cursor: "pointer" });

    /*  F U N C T I O N S   */
    /* add a hover handler */
    playButton.mouseover(function(evt) {
        this.oGlow = playShape.glow({
            opacity: 0.85,
            color: 'lime',
            width: 100
        });
        playShape.attr({ fill: "darkgreen" });
    }).mouseout(function(evt) {
        this.oGlow.remove();
        playShape.attr({ fill: "90-#efe-#0d0:50-#6d8" });
    });

    /* add a click handler */
    playButton.click(function(evt) {
        if (playing) {
            levelNumber += 1;
        }
        playing = true;
        titlePage.remove();
        playButton.hide();
        loadLevel(levelNumber);
        paper.remove();
    });
}



