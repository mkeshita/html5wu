'use strict';

class WUEquipmentSlot extends WUStageObject
{
    constructor (x, y, w, h , type, img)
    {
        super(x, y, w, h);

        this.type = type;
        this.img = img;
    }

    draw ()
    {
        wuStage.ctx.lineWidth = 2;
        wuStage.ctx.strokeStyle = '#DDDDDD';
        wuStage.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        wuStage.ctx.roundRect(this.relativeX, this.relativeY, this.w, this.h, wuStage.layout.borderRadius);
        wuStage.ctx.fill();
        wuStage.ctx.stroke();
        wuStage.ctx.drawImage(this.img, this.relativeX + 4, this.relativeY + 4, this.w - 8, this.h - 8);
    }

    click ()
    {
        wuStage.selectItemTab.show(this);
    }
}
