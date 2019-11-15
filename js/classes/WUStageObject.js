'use strict';

class WUStageObject
{
    constructor (x = 10, y = 10, w = 40, h = 40)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.visible = true;
        this.minors = [];
        this.parent = null;
    }

    addMinors ()
    {
        for (let i = 0; i < arguments.length; i++)
        {
            if (arguments[i] instanceof WUStageObject)
            {
                const minor = arguments[i];

                minor.parent = this;

                this.minors[this.minors.length] = minor;
            }
            else
            {
                console.error(arguments[i]);

                throw new Error('TypeError: argument is not of type WUStageObject');
            }
        }
    }

    removeMinors ()
    {
        for (let i = 0; i < arguments.length; i++)
        {
            if (this.minors.includes(arguments[i]))
            {
                const minor = arguments[i];

                minor.parent = null;

                this.minors.splice(this.minors.indexOf(minor));
            }
        }
    }

    getMinors ()
    {
        const array = [];

        for (let i = 0; i < this.minors.length; i++)
        {
            this.minors[i].visible && WUMethods.push(array, this.minors[i], ...this.minors[i].getMinors());
        }
        
        return array;
    }

    draw ()
    {
        wuStage.ctx.beginPath();
        wuStage.ctx.fillStyle = '#000000';
        wuStage.ctx.rect(this.relativeX,              this.relativeY,              this.w / 2, this.h / 2); 
        wuStage.ctx.rect(this.relativeX + this.w / 2, this.relativeY + this.h / 2, this.w / 2, this.h / 2); 
        wuStage.ctx.fill();
        wuStage.ctx.beginPath();
        wuStage.ctx.closePath();
        wuStage.ctx.fillStyle = '#FF00FF';
        wuStage.ctx.rect(this.relativeX + this.w / 2, this.relativeY,              this.w / 2, this.h / 2); 
        wuStage.ctx.rect(this.relativeX,              this.relativeY + this.h / 2, this.w / 2, this.h / 2);
        wuStage.ctx.fill();
        wuStage.ctx.closePath();
    }

    get relativeX ()
    {
        return this.x + (this.parent ? this.parent.relativeX : 0);
    }

    get relativeY ()
    {
        return this.y + (this.parent ? this.parent.relativeY : 0);
    }
};
