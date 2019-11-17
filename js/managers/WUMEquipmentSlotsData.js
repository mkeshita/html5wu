class WUMEquipmentSlotsData
{
    static imgsPath = '/img/slots/';
    static imgsType = '.svg';

    static get = [{
            x: 160,
            y: 130,
            w: 100,
            h: 100,
            type: 1,
            imgName: 'torso',
        }, {
            x: 170,
            y: 250,
            w: 80,
            h: 80,
            type: 2,
            imgName: 'legs',
        }, {
            x: 60,
            y: 250,
            w: 80,
            h: 80,
            type: 3,
            imgName: 'side-l',
        }, {
            x: 280,
            y: 250,
            w: 80,
            h: 80,
            type: 3,
            imgName: 'side-r',
        }, {
            x: 50,
            y: 150,
            w: 80,
            h: 80,
            type: 3,
            imgName: 'side-l',
        }, {
            x: 290,
            y: 150,
            w: 80,
            h: 80,
            type: 3,
            imgName: 'side-r',
        }, {
            x: 60,
            y: 50,
            w: 80,
            h: 80,
            type: 4,
            imgName: 'top-l',
        }, {
            x: 280,
            y: 50,
            w: 80,
            h: 80,
            type: 4,
            imgName: 'top-r',
        }, {
            x: 180,
            y: 50,
            w: 60,
            h: 60,
            type: 5,
            imgName: 'drone',
        }, {
            x: 100,
            y: 350,
            w: 60,
            h: 60,
            type: 6,
            imgName: 'charge',
        }, {
            x: 180,
            y: 350,
            w: 60,
            h: 60,
            type: 7,
            imgName: 'tele',
        }, {
            x: 260,
            y: 350,
            w: 60,
            h: 60,
            type: 8,
            imgName: 'hook',
        }, {
            x: 80,
            y: 430,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 150,
            y: 430,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 220,
            y: 430,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 290,
            y: 430,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 80,
            y: 500,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 150,
            y: 500,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 220,
            y: 500,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        }, {
            x: 290,
            y: 500,
            w: 50,
            h: 50,
            type: 9,
            imgName: 'mod',
        },
    ];

    static createImgs ()
    {
        for (let i = this.get.length; i--;)
        {
            const src = this.imgsPath + this.get[i].imgName + this.imgsType;

            this.get[i].img = WUMethods.dom('img', { src });
        }
    }
}
