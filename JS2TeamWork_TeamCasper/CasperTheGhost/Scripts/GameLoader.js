

function loadLevel(levelNumber) {
    var level = levels[levelNumber - 1];
    assebliesLoad(level.scriptsToLoad);

    $.getScript('Scripts/CasperObject.js',
        function () {
            var caserLayer = new Kinetic.Layer();
            casper = Casper(200, 200, caserLayer, stage);
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
        default:
            break;
    }
}



// Tests


