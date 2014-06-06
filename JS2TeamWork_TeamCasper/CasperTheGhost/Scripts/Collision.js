function checkCollide(pointX, pointY, object) { // pointX, pointY belong to one rectangle, while the object variables belong to another rectangle
    var oTop = object.getY();
    var oLeft = object.getX();
    var oRight = oLeft+object.getWidth();
    var oBottom = oTop+object.getHeight();

    if (pointX > oLeft && pointX < oRight) {
        if (pointY > oTop && pointY < oBottom) {
            return true;
        }
    }
    else
        return false;
};