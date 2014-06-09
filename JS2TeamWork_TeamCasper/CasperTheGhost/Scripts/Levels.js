var levels = [
    //Level 1 Objects
    {
        background: 'backgroundLavel1Night.png',
        scriptsToLoad: ['CasperObject.js', 'button.js', 'spring.js'],
        collisionObjects: [
            {
                name: 'spring',
                id: 'spring1',
                x: 415,
                y: 275,
                rotation: 5,
                button:
                    { name: 'button', x: 550, y: 450 }
            },
            { name: 'rect', x: 500, y: 280, width: 20, height: 210 },
            { name: 'rect', x: 0, y: 416, width: 410, height: 20 },
            { name: 'rect', x: 500, y: 280, width: 400, height: 20 }
        ],
    },
    //Level 2 Objects
    {
        background: 'backgroundLavel2Night.png',
        scriptsToLoad: ['CasperObject.js', 'flatButton.js', 'AssemblyLine.js', 'ControlLever.js'],
        collisionObjects: [
            {
                name: 'controler',
                x: 710,
                y: 170,
                line:
                    { name: 'line', x: 200, y: 400 }
            },
            {
                name: 'flatButton',
                x: 200,
                y: 181,

            },
            {
                name: 'casperEnemy',
                x: 410,
                y: 250,
                width: 130,
                height: 20,
            },
            { name: 'rect', x: 0, y: 220, width: 420, height: 20 },
            { name: 'rect', x: 690, y: 220, width: 110, height: 20 },
            { name: 'rect', x: 0, y: 520, width: 820, height: 20 }
        ],
    }
]