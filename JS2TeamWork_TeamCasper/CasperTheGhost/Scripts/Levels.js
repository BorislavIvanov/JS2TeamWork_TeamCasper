var levels = [
    {
        background: 'backgroundLavel1Night.png',
        scriptsToLoad: ['CasperObject.js', 'button.js', 'spring.js'],
        collisionObjects: [
            {
                name: 'spring',
                id: 'spring1',
                x: 417,
                y: 280,
                button:
                    { name: 'button', x: 550, y: 450 }
            },
            { name: 'rect', x: 500, y: 280, width: 20, height: 210 },
            { name: 'rect', x: 0, y: 416, width: 410, height: 20 },
            { name: 'rect', x: 500, y: 280, width: 400, height: 20 }
        ],
    }
]