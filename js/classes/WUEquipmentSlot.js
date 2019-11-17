'use strict';

class WUEquipmentSlot extends WUStageObject
{
    constructor (x, y, w, h , type, img)
    {
        super(x, y, w, h);

        this.item = null;
        this.type = type;
        this.img  = img;
    }

    draw ()
    {
        let fillColor   = 'rgba(0, 0, 0, 0.8)';
        let strokeColor = '#DDDDDD';
        let imgScale    = 0.9;
        let img         = this.img;

        if (this.hovered)
        {
            fillColor   = 'rgba(10, 15, 30, 0.8)';
            strokeColor = '#AAAAFF';
        }

        if (this.item)
        {
            imgScale = 1.1;
            img      = this.item.img;
        }

        wuStage.ctx.lineWidth = 2;
        wuStage.ctx.strokeStyle = strokeColor;
        wuStage.ctx.fillStyle = fillColor;

        wuStage.ctx.roundRect(this.relativeX, this.relativeY, this.w, this.h, wuStage.layout.borderRadius);
        wuStage.ctx.fill();
        wuStage.ctx.stroke();
        wuStage.ctx.centerImg(this, imgScale, img);
    }

    click ()
    {
        wuStage.selectItemTab.show(this);
    }

    setItem (item)
    {
        this.item = item;
    }
}
