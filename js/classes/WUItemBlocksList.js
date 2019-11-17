'use strict';

class WUItemBlocksList extends WUStageObject
{
    constructor (x, y)
    {
        super(x, y, 800, 240);

        const r = wuStage.layout.borderRadius;

        this.lArrow = new WUStageObject(20, 92, 50, 60);
        this.rArrow = new WUStageObject(730, 92, 50, 60);

        this.lArrow.draw = function ()
        {
            const x = this.relativeX;
            const y = this.relativeY;
            const { w, h } = this;

            wuStage.ctx.fillStyle = '#DDDDDD';
            wuStage.ctx.beginPath();
            wuStage.ctx.moveTo(x + w, y + h - r - 2);
            wuStage.ctx.arcTo( x + w, y,         x + w - r, y,     r);
            wuStage.ctx.arcTo( x,     y + h / 2, x + w,     y + h, r);
            wuStage.ctx.arcTo( x + w, y + h,     x + w,     y,     r);
            wuStage.ctx.fill();
            wuStage.ctx.closePath();
        }
        this.rArrow.draw = function ()
        {
            const x = this.relativeX;
            const y = this.relativeY;
            const { w, h } = this;

            wuStage.ctx.fillStyle = '#DDDDDD';
            wuStage.ctx.beginPath();
            wuStage.ctx.moveTo(x,     y + h - r - 2);
            wuStage.ctx.arcTo( x,     y,         x + r, y,     r);
            wuStage.ctx.arcTo( x + w, y + h / 2, x,     y + h, r);
            wuStage.ctx.arcTo( x,     y + h,     x,     y,     r);
            wuStage.ctx.fill();
            wuStage.ctx.closePath();
        }

        this.lArrow.click = () => this.showPage(--this.currentPage);
        this.rArrow.click = () => this.showPage(++this.currentPage);


        this.currentPage = 0;
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

        this.addMinors(this.lArrow, this.rArrow, ...this.blocks);
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
        if (items.length > 27)
        {
            this.pages = [];

            for (let i = 0; i < items.length; i += 27) this.pages.push(items.slice(i, i + 27));

            this.showPage(0);
        }
        else
        {
            this.pages = [items];

            for (let i = 0; i < items.length; i++) this.blocks[i].setItem(items[i]);
        }

        return this;
    }

    clear ()
    {
        const blocks = WUMethods.filter(this.blocks, block => block.visible);

        for (let i = 0; i < blocks.length; i++) blocks[i].clear();

        return this;
    }

    showPage (pageIndex)
    {
        const page = this.pages[pageIndex];

        
        // Set page's items
        for (let i = 0; i < page.length; i++) this.blocks[i].setItem(page[i]);


        // Hide unused item blocks
        for (let i = page.length; i < 27; i++) this.blocks[i].visible = false;


        this.currentPage = pageIndex;
        this.lArrow.visible = !(this.currentPage <= 0);
        this.rArrow.visible = !(this.currentPage >= this.pages.length - 1);


        wuStage.canvas.draw();

        return this;
    }
}
