var levels = [
    {
        background: 'backgroundLavel1Night.png',
        scriptsToLoad: ['CasperObject.js', 'button.js', 'spring.js'],
        collisionObjects: [
            {
                type : 'spring',
                name: 'spring1',
                x: 417,
                y: 280,
                button:
                    { name: 'button', x: 550, y: 450 }
            },
            { type: 'rect', x: 500, y: 280, width: 20, height: 210 },
            { type: 'rect', x: 0, y: 416, width: 410, height: 20 }
        ],
    }
]