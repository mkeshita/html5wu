'use strict';

class WUItemBlocksList extends WUStageObject
{
    constructor (x, y)
    {
        super(x, y, 800, 240);

        const c = wuStage.ctx;
        const r = wuStage.layout.borderRadius;

        this.lArrow = new WUStageObject(20, 92, 50, 60);
        this.rArrow = new WUStageObject(730, 92, 50, 60);

        this.lArrow.draw = function ()
        {
            const x = this.relativeX;
            const y = this.relativeY;
            const { w, h } = this;

            let color = wuStage.layout.textColor;

            c.beginPath();
            c.moveTo(x + w, y + h - r - 2);
            c.arcTo( x + w, y,         x + w - r, y,     r);
            c.arcTo( x,     y + h / 2, x + w,     y + h, r);
            c.arcTo( x + w, y + h,     x + w,     y,     r);

            if (this.hovered)
            {
                color = wuStage.layout.hoverTextColor;

                c.strokeStyle = color;
                c.lineWidth = 3;
                c.stroke();
            }

            c.fillStyle = color;
            c.fill();
            c.closePath();
        }
        this.rArrow.draw = function ()
        {
            const x = this.relativeX;
            const y = this.relativeY;
            const { w, h } = this;

            let color = wuStage.layout.textColor;
            
            c.beginPath();
            c.moveTo(x,     y + h - r - 2);
            c.arcTo( x,     y,         x + r, y,     r);
            c.arcTo( x + w, y + h / 2, x,     y + h, r);
            c.arcTo( x,     y + h,     x,     y,     r);

            if (this.hovered)
            {
                color = wuStage.layout.hoverTextColor;

                c.strokeStyle = color;
                c.lineWidth = 3;
                c.stroke();
            }

            c.fillStyle = color;
            c.fill();
            c.closePath();
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
        const c = wuStage.ctx;

        c.lineWidth   = 2,
        c.strokeStyle = wuStage.layout.textColor,
        c.fillStyle   = wuStage.layout.bgColor,
        c.roundRect(this.relativeX, this.relativeY, this.w, this.h, wuStage.layout.borderRadius);
        c.fill();
        c.stroke();
    }

    setList (items)
    {
        if (items.length > 27)
        {
            this.pages = [];

            for (let i = 0; i < items.length; i += 27) this.pages.push(items.slice(i, i + 27));
        }
        else
        {
            this.pages = [items];

            for (let i = 0; i < items.length; i++) this.blocks[i].setItem(items[i]);
        }

        this.showPage(0);

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
