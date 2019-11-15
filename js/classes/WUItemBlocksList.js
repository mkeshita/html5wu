'use strict';

class WUItemBlocksList extends WUStageObject
{
    constructor (x, y)
    {
        super(x, y, 800, 240);

        this.pages = [];
        this.blocks = [];

        let blockX = 90, blockY = 20;
        
        for (let i = 1; i < 28; i++) 
        {
            this.blocks[i - 1] = new WUItemBlock(blockX, blockY);

            blockX += 70;

            if (i % 9 === 0)
            {
                blockX = 90;
                blockY += 70;
            }
        }

        this.addMinors(...this.blocks);
    }

    draw ()
    {
        wuStage.ctx.lineWidth = 2;
        wuStage.ctx.strokeStyle = '#DDDDDD';
        wuStage.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        wuStage.ctx.roundRect(this.relativeX, this.relativeY, this.w, this.h, wuStage.layout.borderRadius);
        wuStage.ctx.fill();
        wuStage.ctx.stroke();
    }

    setList (items)
    {
        for (let i = 0; i < items.length; i++) this.blocks[i].setItem(items[i]);
    }

    clear ()
    {
        const blocks = WUMethods.filter(this.blocks, block => block.visible);

        for (let i = 0; i < blocks.length; i++) blocks[i].clear();
    }
}
