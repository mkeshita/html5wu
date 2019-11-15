'use strict';

class WUSelectItemTab extends WUTab
{
    constructor ()
    {
        super();

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

        const items = WUMethods.filter(WUItemsDB.getAll(), item => item.type === slot.type);

        this.itemBlocksList.setList(items);

        wuStage.canvas.draw();
    }

    hide ()
    {
        this.visible = false;

        this.itemBlocksList.clear();
        
        wuStage.canvas.draw();
    }
}
