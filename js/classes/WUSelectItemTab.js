'use strict';

class WUSelectItemTab extends WUTab
{
    constructor ()
    {
        super();

        this.currentSlot = null;
        
        this.itemBlocksList = new WUItemBlocksList(100, 290);

        this.addMinors(this.itemBlocksList);
    }

    click ()
    {
        this.hide();
    }

    show (slot)
    {
        this.visible = true;

        if (!this.currentSlot || slot.type !== this.currentSlot.type)
        {
            const items = WUMethods.filter(WUItemsDB.getAll(), item => item.type === slot.type);

            this.itemBlocksList.clear().setList(items);
        }

        this.currentSlot = slot;

        wuStage.canvas.draw();
    }
}
