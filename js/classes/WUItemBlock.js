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
        
        let fillColor   = 'rgba(0, 0, 0, 0.8)';
        let strokeColor = '#DDDDDD';
        let imgScale    = 0.9;

        if (this.hovered)
        {
            fillColor   = 'rgba(10, 15, 30, 0.8)';
            strokeColor = '#AAAAFF';
            imgScale    = 1;
        }

        wuStage.ctx.strokeStyle = strokeColor;
        wuStage.ctx.fillStyle = fillColor;

        wuStage.ctx.roundRect(relativeX, relativeY, w, h, wuStage.layout.borderRadius);
        wuStage.ctx.fill();
        wuStage.ctx.stroke();
        wuStage.ctx.centerImg(this, imgScale, item.img);
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
        wuStage.selectItemTab.hide().currentSlot.setItem(this.item);
        wuStage.mechSummary.update();
        wuStage.canvas.draw();
    }
}
