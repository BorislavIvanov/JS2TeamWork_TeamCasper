var paper, set;
var levelNumber=1;
paper = Raphael(8, 8, 800, 600);

paper.setStart();

var pageFill = paper.rect(8, 8, 800, 600).attr({ fill: "rgb(225, 226, 202)" }).attr({ stroke: 'none' });
var titleImage = paper.image("Resources/CasperTitle.png", 250, 215, 300, 90);

var titleAnimaton = function () {
    titleImage.animate({ "transform": "..r-360, 400,300" }, 5000, "bounce");
};
setTimeout(titleAnimaton, 2000);

var titlePage = paper.setFinish();


/* a rectangle with a linear gradient from light-green via green (at 50%) to light-green */
var playShape = paper.rect(325, 55, 120, 70, 35, 45).attr({ fill: "90-#efe-#0d0:50-#6d8", "stroke-width": 5, stroke: "lightgreen" });
var playText = paper.text(386, 88, "PLAY");
playText.attr({ "font-family": "Comic Sans MS", "font-size": 32, "font-weight": "800", fill: "yellow", stroke: "brown", "stroke-width": "3px" });

/* group both the button and the text in a single Set shape we call playButton */
var playButton = paper.set();
playButton.push(playShape);
playButton.push(playText);
playButton.attr({ cursor: "pointer" });

/*  F U N C T I O N S   */
/* add a hover handler */
playButton.mouseover(function(evt){
    this.oGlow = playShape.glow({
        opacity: 0.85,
        color: 'lime',
        width: 100
    }); playShape.attr({ fill: "darkgreen" });
}).mouseout(function (evt) {
    this.oGlow.remove(); playShape.attr({ fill: "90-#efe-#0d0:50-#6d8" });
});

/* add a click handler */
playButton.click(function (evt) {
    titlePage.remove();
    playButton.hide();
    loadLevel(levelNumber);
});



