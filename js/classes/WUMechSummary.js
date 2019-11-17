'use strict';

class WUMechSummary extends WUStageObject
{
    constructor (x, y)
    {
        super(x, y, 390, 120);

        this.stats = WUStatsData.getMechSummaryStats();
    }

    draw ()
    {
        wuStage.ctx.lineWidth = 2;
        wuStage.ctx.strokeStyle = '#DDDDDD';
        wuStage.ctx.roundRect(this.relativeX, this.relativeY, this.w, this.h, wuStage.layout.borderRadius);
        wuStage.ctx.stroke();
    }

    update ()
    {
        
    }
}
