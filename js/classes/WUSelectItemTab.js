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
        this.selectItem(null);
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

    selectItem (item)
    {
        if (item && item === this.currentSlot.item)
        {
            this.hide();

            return;
        }
        

        this.currentSlot.item = item;

        wuStage.mechSummary.update();

        if (this.currentSlot.type < 6)
        {
            const setup = WUMethods.map(wuStage.equipmentSlots, slot => slot.item);

            wuStage.mechDisplay.assemble(setup);
        }

        this.hide();
    }
}
