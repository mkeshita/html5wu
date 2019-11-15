'use strict';

(function ()
{
    window.wuStage = new WUStage(1000, 600);

    wuStage.ctx.font = '20px Chakra Petch';
    wuStage.ctx.strokeStyle = wuStage.ctx.fillStyle = '#DDDDDD';
    wuStage.ctx.lineWidth = 2;

    document.querySelector('workshop-unlimited').appendChild(window.wuStage.canvas);


    const rng = () => Math.round(Math.random() * 255);
    const slotsData = WUMEquipmentSlotsData.get;
    const items = WUItemsDB.getAll();

    const onImagesReady = setInterval(function ()
    {
        const readySlots = WUMethods.filter(slotsData, data => data.img.complete);
        const readyItems = WUMethods.filter(items, item => item.img.complete);
        
        if (readySlots.length === slotsData.length &&
            readyItems.length === items.length)
        {
            clearInterval(onImagesReady);

            wuStage.init();
        }
        else
        {
            const current = readySlots.length + readyItems.length;
            const total = slotsData.length + items.length;
            const procent = current / total * 100;

            wuStage.ctx.clear();
            wuStage.ctx.fillText(`Loading... (${ procent.toFixed(1) }%)`, 425, 500);
        }

    }, 100);

})();
