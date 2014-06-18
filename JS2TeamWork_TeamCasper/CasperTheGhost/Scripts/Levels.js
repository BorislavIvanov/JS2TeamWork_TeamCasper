var levels = [
    //Level 1 Objects
    {
        casperX: 0,
        casperY: 327,
        background: 'backgroundLavel1Night.png',
        initialScore: 200500,
        collisionObjects: [
            {
                name: 'spring',
                id: 'spring1',
                x: 415,
                y: 275,
                rotation: 10,
                button:
                    { name: 'button', x: 550, y: 450 }
            },
            {
                name: 'leftTube',
                x: 0,
                y: 327,
                width: 83
            },
            {
                name: 'rightTube',
                x: 734,
                y: 188,
                width: 110
            },
            { name: 'rect', x: 0, y: 416, width: 410, height: 20 },
            { name: 'rect', x: 500, y: 280, width: 20, height: 210 },
            { name: 'rect', x: 500, y: 280, width: 400, height: 20 },

            {
                name: 'korpus',
                x: 223,
                y: 0
            },
            {
                name: 'controlerLevel1',
                x: 215,
                y: 250,
                beam:
                    { name: 'beam', x: 240, y: 7 }
            }
        ]
    },
    //Level 2 Objects
    {
        casperX: 0,
        casperY: 132,
        background: 'backgroundLavel2Night.png',
        initialScore: 300500,
        collisionObjects: [
            {
                name: 'controler',
                x: 710,
                y: 170,
                line:
                    { name: 'line', x: 200, y: 400 }
            },
            {
                name: 'rotaryBeam',
                x: 580,
                y: 220,
                flatButton: { name: 'flatButton', x: 200, y: 181 }
            },
            {
                name: 'spark',
                x: 423,
                y: 259
            },
            {
                name: 'leftTube',
                x: 0,
                y: 132,
                width: 75
            },
            {
                name: 'rightTube',
                x: 700,
                y: 430,
                width: 100
            },
            { name: 'rect', x: 0, y: 220, width: 425, height: 20 },
            { name: 'rect', x: 560, y: 220, width: 47, height: 20 },
            { name: 'rect', x: 690, y: 220, width: 110, height: 20 },
            { name: 'rect', x: 0, y: 520, width: 820, height: 20 }
        ]
    }
];