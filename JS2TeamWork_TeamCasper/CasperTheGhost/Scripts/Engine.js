//TEST
var drawField = new Kinetic.Stage({
    container: 'canvas-container',
    width: 800,
    height: 600
});

var layerOne = new Kinetic.Layer();

var rect = new Kinetic.Rect({
    fill: 'yellowgreen',
    stroke: '#CCCCCC',
    x: 250,
    y: 350,
    width: 57,
    height: 93
});

layerOne.add(rect);
drawField.add(layerOne);
//TEST