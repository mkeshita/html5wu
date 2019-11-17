'use strict';

class WUMechPart extends WUStageObject
{
    constructor ()
    {
        super();

        this.item = null;
        this.visible = false;
    }

    draw ()
    {
        if (!this.item)
        {
            this.visible = false;
            return;
        }

        const C = wuStage.ctx;
        const img = this.item.img;
        const imgW = img.naturalWidth  * this.parent.scale;
        const imgH = img.naturalHeight * this.parent.scale;

        C.drawImage(img, this.relativeX, this.relativeY, imgW, imgH);
    }

    setItem (item)
    {
        this.item = item || null;
        
        if (!item)
        {
            this.visible = false;
            return;
        };
        
        this.visible = true;
        this.w = item.img.naturalWidth;
        this.h = item.img.naturalHeight;
    }

    get ap ()
    {
        return this.item ? this.item.ap : null;
    }
}