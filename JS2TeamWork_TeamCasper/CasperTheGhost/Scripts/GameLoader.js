

function loadLevel(levelNumber) {
    var level = levels[levelNumber - 1];
    assebliesLoad(level.scriptsToLoad);

    $.getScript('Scripts/CasperObject.js',
        function () {
            var caserLayer = new Kinetic.Layer();
            casper = Casper(100, 100, caserLayer, stage);
        }
    );
    loadBackground(level.background);
    var objLayer = new Kinetic.Layer();
    for (var objIndex in level.collisionObjects) {
        objectsBiulder(level.collisionObjects[objIndex], objLayer);
    }
    stage.add(objLayer);

}


function assebliesLoad(jsFilesToAddInDOM) {
    for (var assemblyIndex = 0; assemblyIndex < jsFilesToAddInDOM.length; assemblyIndex++) {
        var fileref = document.createElement('script');
        fileref.setAttribute("src", 'Scripts/' + jsFilesToAddInDOM[assemblyIndex]);
        document.getElementsByTagName("body")[0].appendChild(fileref);
        //var bodyHtml = body.innerHTML;
        //body.innerHTML = '<script src="Scripts/'+ jsFilesToAddInDOM[assemblyIndex] +'"></script>' + bodyHtml;
    }
}

function objectsBiulder(object, objLeyer) {
    switch (object.name) {
        case 'rect':
            var rect = new Kinetic.Rect({
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height,
                fill: 'orange'
            });
            objLeyer.add(rect);
            collisionObjects.push(rect);
            break;
        case 'spring':
            $.getScript('Scripts/spring.js',
                function () {
                    var thisSpring = Spring(object.x, object.y, objLeyer, stage, object.id, object.rotation);
                    var ourSpringImage = thisSpring.image.rotate(0);
                    $.getScript('Scripts/button.js', function () {
                        var but = Button(object.button.x, object.button.y, objLeyer, stage, thisSpring);
                    });
                    collisionObjects.push(ourSpringImage);
                });
            break;
        case 'controler':
            $.getScript('Scripts/ControlLever.js',
                function () {
                    var thisControler = ControlLever(object.x, object.y, objLeyer, stage);
                    var ourControlerImage = thisControler.image;
                    $.getScript('Scripts/AssemblyLine.js', function () {
                        var line = AssemblyLine(object.line.x, object.line.y, objLeyer, stage, 4, thisControler);
                        collisionObjects.push(line.image);
                    });
                    collisionObjects.push(ourControlerImage);
                });
            break;
        case 'casperEnemy':
            $.getScript('Scripts/SampleCasperEnemy.js',
                function () {
                    var ourEnemy = sampleCasperEnemy(object.x, object.y, object.width, object.height);
                    objLeyer.add(ourEnemy);
                    collisionObjects.push(ourEnemy);
                });
            break;
        case 'flatButton':
            $.getScript('Scripts/flatButton.js',
                function () {
                    var ourFlatButton = flatButton(object.x, object.y, objLeyer, stage, false);
                    var ourFlatButtonImage = ourFlatButton.image;
                    collisionObjects.push(ourFlatButtonImage);
                });
            break;
        default:
            break;
    }
}



// Tests


