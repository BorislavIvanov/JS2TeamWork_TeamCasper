function casperEnemy(x, y, width, height) {
    var casperEnemy = new Kinetic.Rect(x, y, width, height);
    casperEnemy.casperEnemy = true;
    return casperEnemy;
}