function Level(number) {
    var level = {
        number: number,
        background: new Image(),
        layers: [],
        collisionObjects: [],
    }
    return level
}