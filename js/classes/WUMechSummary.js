'use strict';

class WUMechSummary extends WUStageObject
{
    constructor (x, y)
    {
        super(x, y, 440, 120);

        let statBlocksX = 0;
        let statBlocksY = 0;
        const statBlocksW = this.w * 0.9 / 3;
        const statBlocksH = this.h / 3;

        this.stats = WUStatsData.getMechSummaryStats();
        this.statNames = Object.keys(this.stats);
        this.statBlocks = {};

        WUMethods.loop(this.statNames, name =>
        {
            const block = new WUStatBlock(this.stats[name], statBlocksX, statBlocksY, statBlocksW, statBlocksH);

            this.statBlocks[name] = block;

            statBlocksY += statBlocksH;

            if (statBlocksY >= statBlocksH * 3)
            {
                statBlocksY = 0;
                statBlocksX += statBlocksW;
            }

            this.addMinors(block);

            return block;
        });
    }

    draw ()
    {
        const x = this.relativeX;
        const y = this.relativeY;
        const { w, h } = this;

        wuStage.ctx.lineWidth   = 2;
        wuStage.ctx.fillStyle   = wuStage.layout.bgColor;
        wuStage.ctx.strokeStyle = wuStage.layout.textColor;

        wuStage.ctx.beginPath();
        wuStage.ctx.roundRect(x, y, w, h, wuStage.layout.borderRadius);
        wuStage.ctx.fill();
        wuStage.ctx.moveTo(x + w * 0.9, y);
        wuStage.ctx.lineTo(x + w * 0.9, y + h);
        wuStage.ctx.stroke();
        wuStage.ctx.closePath();
    }

    update ()
    {
        const statMap = {};

        WUMethods.loop(this.statNames, name =>
        {
            statMap[name] = 0;

            WUMethods.loop(wuStage.equipmentSlots, slot =>
            {
                if (slot.item) statMap[name] += slot.item.stats[name] || 0;
            });

            this.statBlocks[name].value = statMap[name];
        });

        // wuStage.canvas.draw();
    }
}
