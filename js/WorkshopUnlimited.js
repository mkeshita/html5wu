'use strict';

(function ()
{
    window.wuStage = new WUStage(1000, 600);

    WUMethods.set(wuStage.ctx, {
        strokeStyle: '#DDDDDD',
        fillStyle: '#DDDDDD',
        lineWidth: 2,
        lineCap: 'round',
        font: '26px Chakra Petch',
    });


    document.querySelector('workshop-unlimited').appendChild(window.wuStage.canvas);


    const slots = WUMEquipmentSlotsData.get;
    const stats = WUStatsData.all;
    const items = WUItemsDB.getAll();

    const onImagesReady = setInterval(function ()
    {
        const readySlots = WUMethods.filter(slots, data => data.img.complete);
        const readyStats = WUMethods.filter(stats, stat => stat.img.complete);
        const readyItems = WUMethods.filter(items, item => item.img.complete);
        
        if (readySlots.length === slots.length &&
            readyStats.length === stats.length &&
            readyItems.length === items.length)
        {
            clearInterval(onImagesReady);

            wuStage.init();
        }
        else
        {
            const current = readySlots.length + readyStats.length + readyItems.length;
            const total   = slots.length + stats.length + items.length;
            const procent = current / total * 100;

            wuStage.ctx.fillRect(200, 400, procent * 6, 30);
            wuStage.ctx.strokeRect(200, 400, 600, 30);
            wuStage.ctx.clearRect(475, 440, 105, 40);
            wuStage.ctx.fillText(Math.round(procent) + '%', 480, 470);
        }

    }, 100);

})();


// Prevents the stage from overflowing the window
window.addEventListener('resize', function ()
{
    const c = wuStage.canvas;
    const x = 100 - (innerWidth  / c.width  * 100);
    const y = 100 - (innerHeight / c.height * 100);

    if (x > 0)
    {
        if (y > 0)
        {
            if (y > x)
            {
                c.style.width = '';
                c.style.height = c.height * (innerHeight / c.height) + 'px';
                return
            }
        }
        c.style.width = c.width * (innerWidth / c.width) + 'px';
        c.style.height = '';
        return;
    }

    c.style.width  = '';
    c.style.height = '';
});

// Triggers the resize event on start to force the stage size calculation
window.dispatchEvent(new Event('resize'));