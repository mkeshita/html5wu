'use strict';

(function ()
{
    window.wuStage = new WUStage(1000, 600);

    wuStage.ctx.font = '30px Lucida Console';
    wuStage.ctx.strokeStyle = wuStage.ctx.fillStyle = '#DDDDDD';
    wuStage.ctx.lineWidth = 2;


    document.querySelector('workshop-unlimited').appendChild(window.wuStage.canvas);


    const slotsData = WUMEquipmentSlotsData.get;
    const items = WUItemsDB.getAll();

    const onImagesReady = setInterval(function ()
    {
        const readySlots = WUMethods.filter(slotsData, data => data.img.complete);
        const readyItems = WUMethods.filter(items,     item => item.img.complete);
        
        if (readySlots.length === slotsData.length &&
            readyItems.length === items.length)
        {
            clearInterval(onImagesReady);

            wuStage.ctx.font = '20px Chakra Petch';

            wuStage.init();
        }
        else
        {
            const current = readySlots.length + readyItems.length;
            const total   = slotsData.length  + items.length;
            const procent = current / total * 100;

            wuStage.ctx.fillRect(200, 400, procent * 6, 30);
            wuStage.ctx.strokeRect(200, 400, 600, 30);
            wuStage.ctx.clearRect(480, 440, 100, 40);
            wuStage.ctx.fillText(Math.round(procent) + '%', 480, 470);
        }

    }, 100);

})();
