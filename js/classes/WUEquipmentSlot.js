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
        const c = wuStage.ctx;

        let fillColor   = wuStage.layout.bgColor;
        let strokeColor = wuStage.layout.textColor;
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

        c.lineWidth   = 2;
        c.strokeStyle = strokeColor;
        c.fillStyle   = fillColor;

        c.roundRect(this.relativeX, this.relativeY, this.w, this.h, wuStage.layout.borderRadius);
        c.fill();
        c.stroke();
        c.centerImg(this, imgScale, img);
    }

    click ()
    {
        wuStage.selectItemTab.show(this);
    }
}
