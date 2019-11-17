'use strict';

class WUStatBlock extends WUStageObject
{
    constructor (stat, x, y, w, h)
    {
        super(x, y, w, h);

        this.stat = stat;
        this.value = 0;
    }

    draw ()
    {
        const x = this.relativeX;
        const y = this.relativeY;
        const { w, h, stat, value } = this;

        wuStage.ctx.fillStyle = wuStage.layout.overBgColor;
        
        wuStage.ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
        wuStage.ctx.drawImage(stat.img, x + 8, y + 6, 28, 28)

        wuStage.ctx.fillStyle = wuStage.layout.textColor;

        wuStage.ctx.fillText(value, x + 44, y + 28);
    }
}
