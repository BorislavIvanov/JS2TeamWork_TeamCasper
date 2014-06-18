function scoreBox(x, y, text, layer, stage) {
    var scoreBox = new Kinetic.Text({
        x: x,
        y: y,
        text: text,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'red',
        width: 380,
    });
    layer.add(scoreBox);
    stage.add(layer);
    return scoreBox;
}