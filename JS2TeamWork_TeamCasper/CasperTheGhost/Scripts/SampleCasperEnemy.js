﻿function sampleCasperEnemy(x, y, width, height, layer, stage) {
    var sampleCasperEnemy = new Kinetic.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: 'red',
    });
    sampleCasperEnemy.casperEnemy = true;
    return sampleCasperEnemy;
}