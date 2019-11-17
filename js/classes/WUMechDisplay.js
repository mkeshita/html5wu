'use strict';

class WUMechDisplay extends WUStageObject
{
    constructor (x, y, w, h)
    {
        super(x, y, w, h);

        this.scale = 1;
        this.parts = {};
        this.partNames = [
            'torso', 'leg2',  'leg1', 'side1', 'side2',
            'side3', 'side4', 'top1', 'top2',  'drone'
        ];
        
        WUMethods.loop(this.partNames, name =>
        {
            const part = new WUMechPart();

            this.parts[name] = part;
        });

        this.addMinors(
            this.parts.side4, this.parts.side2,
            this.parts.leg2,  this.parts.top2,
            this.parts.torso, this.parts.top1,
            this.parts.leg1,  this.parts.side3,
            this.parts.side1, this.parts.drone,
        );
    }

    draw () {}

    assemble (setup)
    {
        if (!setup[0])
        {
            WUMethods.loop(this.partNames, name => this.parts[name].setItem(null));

            if (setup[1])
            {
                this.parts.leg1.setItem(setup[1]);
                this.parts.leg2.setItem(setup[1]);
                this.adjust();
            }

            return;
        }

        setup.splice(1, 0, setup[1]);

        WUMethods.loop(this.partNames, (name, i) => this.parts[name].setItem(setup[i]));

        this.adjust();
    }

    adjust ()
    {
        const torso = this.parts.torso;
        const leg1  = this.parts.leg1;
        const drone = this.parts.drone;

        if (!torso.visible)
        {
            if (leg1.visible)
            {
                const leg2 = this.parts.leg2;

                leg2.x = (this.w - leg2.w * this.scale) / 2 + 50 * this.scale;
                leg1.x = (this.w - leg1.w * this.scale) / 2 - 50 * this.scale;
                leg1.y = leg2.y = this.h - leg1.h * this.scale;
            }

            return;
        }

        const skipAttachment = ['torso', 'leg1', 'drone'];

        if (!leg1.visible)
        {
            torso.x = (this.w - torso.item.img.naturalWidth  * this.scale) / 2;
            torso.y =  this.h - torso.item.img.naturalHeight * this.scale;
        }
        else
        {
            leg1.x = (this.w - leg1.w * this.scale - (torso.item.attachment.leg2.x * this.scale - torso.item.attachment.leg1.x  * this.scale)) / 2;
            leg1.y =  this.h - leg1.h * this.scale;

            torso.x = leg1.x + (leg1.item.attachment.x - torso.item.attachment.leg1.x) * this.scale;
            torso.y = leg1.y + (leg1.item.attachment.y - torso.item.attachment.leg1.y) * this.scale;
        }

        if (drone.visible)
        {
            drone.x = torso.x - drone.w * this.scale;
            drone.y = torso.y - drone.h * this.scale - 50;
        }

        WUMethods.loop(this.partNames, name =>
        {
            if (!this.parts[name].visible || skipAttachment.includes(name)) return;

            const part = this.parts[name];

            part.x = torso.x + (torso.item.attachment[name].x - part.item.attachment.x) * this.scale;
            part.y = torso.y + (torso.item.attachment[name].y - part.item.attachment.y) * this.scale;
        });
    }
}