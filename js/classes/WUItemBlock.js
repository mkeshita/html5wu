'use strict';

class WUItemBlock extends WUStageObject
{
    constructor (x, y)
    {
        super(x, y, 60, 60);

        this.item = null;
        this.visible = false;
    }

    draw ()
    {
        const { relativeX, relativeY, w, h, item } = this;

        wuStage.ctx.lineWidth = 2;
        wuStage.ctx.strokeStyle = '#DDDDDD';
        wuStage.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        wuStage.ctx.roundRect(relativeX, relativeY, w, h, wuStage.layout.borderRadius);
        wuStage.ctx.fill();
        wuStage.ctx.stroke();
        wuStage.ctx.centerImg(this, 0.9, item.img);

        //wuStage.ctx.drawImage(item.img, relativeX + 4, relativeY + 4, w - 8, h - 8)
    }

    setItem (item)
    {
        this.item = item;
        this.visible = true;
    }

    clear ()
    {
        this.item = null;
        this.visible = false;
    }

    click ()
    {
        
    }
}
