'use strict';

class WUTab extends WUStageObject
{
    constructor ()
    {
        super(0, 0, wuStage.w, wuStage.h);

        this.visible = false;
    }

    draw ()
    {
        wuStage.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        wuStage.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    show ()
    {
        this.visible = true;

        wuStage.canvas.draw();

        return this;
    }

    hide ()
    {
        this.visible = false;

        wuStage.canvas.draw();

        return this;
    }
}