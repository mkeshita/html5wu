'use strict';

class WUStage extends WUStageObject
{
    constructor (w, h)
    {
        super(0, 0, w, h);

        this.layout = {
            bgColor:        'rgba(0, 0, 0, 0.8)',
            hoverBgColor:   'rgba(10, 15, 30, 0.8)',
            overBgColor:    'rgba(0, 30, 80, 0.1)',
            textColor:      '#DDDDDD',
            hoverTextColor: '#AAAAFF',
            borderRadius:   5,
        };


        this.canvas        = document.createElement('canvas');
        this.canvas.width  = w;
        this.canvas.height = h;
        this.canvas.draw   = () =>
        {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const minors = this.getMinors();
    
            for (let i = 0; i < minors.length; i++) if (minors[i].visible) minors[i].draw();
        };
        this.canvas.addEventListener('mousedown', e =>
        {
            const canvasBounding = this.canvas.getBoundingClientRect();

            const mouse = {
                x: e.clientX - canvasBounding.x,
                y: e.clientY - canvasBounding.y,
            };

            const minors = this.getMinors();

            for (let i = minors.length; i--;)
            {
                const target = minors[i];

                if (target.visible &&
                    mouse.x > target.relativeX * wuStage.canvas.getScale() &&
                    mouse.y > target.relativeY * wuStage.canvas.getScale() &&
                    mouse.x < target.relativeX * wuStage.canvas.getScale() + target.w * wuStage.canvas.getScale() &&
                    mouse.y < target.relativeY * wuStage.canvas.getScale() + target.h * wuStage.canvas.getScale())
                {
                    const e = {
                        target,
                        mouse,
                    };

                    if (typeof target.click === 'function') target.click(e);

                    return;
                }
            }
        });
        this.canvas.addEventListener('mousemove', e =>
        {
            const b = this.canvas.getBoundingClientRect();

            const mouse = {
                x: e.clientX - b.x,
                y: e.clientY - b.y,
            };

            const minors = this.getMinors();

            for (let i = minors.length; i--;)
            {
                const target = minors[i];

                if (target.visible &&
                    mouse.x > target.relativeX * wuStage.canvas.getScale() &&
                    mouse.y > target.relativeY * wuStage.canvas.getScale() &&
                    mouse.x < target.relativeX * wuStage.canvas.getScale() + target.w * wuStage.canvas.getScale() &&
                    mouse.y < target.relativeY * wuStage.canvas.getScale() + target.h * wuStage.canvas.getScale())
                {
                    const e = {
                        target,
                        mouse,
                    };

                    if (!target.hovered)
                    {
                        target.hovered = true;

                        if (this.lastHovered) this.lastHovered.hovered = false;

                        this.lastHovered = target;

                        if (typeof target.hover === 'function') target.hover(e);

                        this.canvas.draw();
                    }

                    return;
                }
            }

            if (this.lastHovered)
            {
                this.lastHovered.hovered = false;
                this.lastHovered = null;

                this.canvas.draw();
            }
        });

        this.ctx = this.canvas.getContext('2d');
        this.ctx.roundRect = function (x, y, w, h, r)
        {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;

            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y,     x + w, y + h, r);
            this.arcTo(x + w, y + h, x,     y + h, r);
            this.arcTo(x,     y + h, x,     y,     r);
            this.arcTo(x,     y,     x + w, y,     r);
            this.closePath();
        };
        this.ctx.clear = () => this.ctx.clearRect(0, 0, w, h);
        this.ctx.centerImg = function (obj, scale, img)
        {
            if (!img) img = obj.img;

            let imgW = obj.w * scale;
            let imgH = obj.h * scale;

            if (img.naturalWidth > img.naturalHeight)
            {
                imgH = img.naturalHeight / img.naturalWidth * obj.w * scale;
            }
            else
            {
                imgW = img.naturalWidth / img.naturalHeight * obj.h * scale;
            }

            const imgX = obj.relativeX + (obj.w - imgW) / 2;
            const imgY = obj.relativeY + (obj.h - imgH) / 2;

            wuStage.ctx.drawImage(img, imgX, imgY, imgW, imgH);
        };
        this.canvas.getScale = function ()
        {
            return this.getBoundingClientRect().width / this.width;
        }

        WUMEquipmentSlotsData.createImgs();
        WUStatsData.createImgs();
        WUItemsDB.createImgs();
    }

    init ()
    {
        const slotsData = WUMEquipmentSlotsData.get;

        this.equipmentSlots = [];

        for (let i = 0; i < slotsData.length; i++)
        {
            const { x, y, w, h, type, img } = slotsData[i];

            this.equipmentSlots[i] = new WUEquipmentSlot(x, y, w, h, type, img);
        }

        this.mechDisplay = new WUMechDisplay(635, 325, 100, 100);

        this.selectItemTab = new WUSelectItemTab();

        this.mechSummary = new WUMechSummary(465, 430);

        this.addMinors(this.mechDisplay, ...this.equipmentSlots, this.mechSummary, this.selectItemTab);

        this.canvas.draw();
    }
}

// Bones & chris travis
