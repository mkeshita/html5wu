'use strict';

class WUStatsData
{
    static genSrc (stat)
    {
        return `/img/stats/${ stat.name }.svg`;
    }

    static weight = {
        name: 'weight',
        title: 'Weight',
        inputs: 1,
    };
    static health = {
        name: 'health',
        title: 'Hit Points',
        inputs: 1,
    };
    static eneCap = {
        name: 'eneCap',
        title: 'Energy Capacity',
        inputs: 1,
    };
    static eneReg = {
        name: 'eneReg',
        title: 'Energy Regeneration',
        inputs: 1,
    };
    static heaCap = {
        name: 'heaCap',
        title: 'Heat Capacity',
        inputs: 1,
    };
    static heaCol = {
        name: 'heaCol',
        title: 'Cooling',
        inputs: 1,
    };
    static phyRes = {
        name: 'phyRes',
        title: 'Physical Resistance',
        inputs: 1,
    };
    static expRes = {
        name: 'expRes',
        title: 'Explosive Resistance',
        inputs: 1,
    };
    static eleRes = {
        name: 'eleRes',
        title: 'Electric Resistance',
        inputs: 1,
    };
    static phyDmg = {
        name: 'phyDmg',
        title: 'Physical Damage',
        inputs: 2,
    };
    static phyResDmg = {
        name: 'phyResDmg',
        title: 'Physical Resistance Drain',
        inputs: 1,
    };
    static expDmg = {
        name: 'expDmg',
        title: 'Explosive Damage',
        inputs: 2,
    };
    static heaDmg = {
        name: 'heaDmg',
        title: 'Heat Damage',
        inputs: 1,
    };
    static heaCapDmg = {
        name: 'heaCapDmg',
        title: 'Heat Capacity Damage',
        inputs: 1,
    };
    static heaColDmg = {
        name: 'heaColDmg',
        title: 'Heat Cooling Damage',
        inputs: 1,
    };
    static expResDmg = {
        name: 'expResDmg',
        title: 'Explosive Resistance Drain',
        inputs: 1,
    };
    static eleDmg = {
        name: 'eleDmg',
        title: 'Electric Damage',
        inputs: 2,
    };
    static eneDmg = {
        name: 'eneDmg',
        title: 'Energy Damage',
        inputs: 1,
    };
    static eneCapDmg = {
        name: 'eneCapDmg',
        title: 'Energy Capacity Damage',
        inputs: 1,
    };
    static eneRegDmg = {
        name: 'eneRegDmg',
        title: 'Energy Regeneration Damage',
        inputs: 1,
    };
    static eleResDmg = {
        name: 'eleResDmg',
        title: 'Electric Resistance Damage',
        inputs: 1,
    };
    static range = {
        name: 'range',
        title: 'Range',
        inputs: 1,
    };
    static push = {
        name: 'push',
        title: 'Knockback',
        inputs: 1,
    };
    static pull = {
        name: 'pull',
        title: 'Pull',
        inputs: 1,
    };
    static recoil = {
        name: 'recoil',
        title: 'Recoil',
        inputs: 1,
    };
    static retreat = {
        name: 'retreat',
        title: 'Retreat',
        inputs: 1,
    };
    static advance = {
        name: 'advance',
        title: 'Advance',
        inputs: 1,
    };
    static walk = {
        name: 'walk',
        title: 'Walking Distance',
        inputs: 1,
    };
    static jump = {
        name: 'jump',
        title: 'Jumping Distance',
        inputs: 1,
    };
    static uses = {
        name: 'uses',
        title: 'Uses',
        inputs: 1,
    };
    static backfire = {
        name: 'backfire',
        title: 'Backfire',
        inputs: 1,
    };
    static heaCost = {
        name: 'heaCost',
        title: 'Heat Generation',
        inputs: 1,
    };
    static eneCost = {
        name: 'eneCost',
        title: 'Energy Consumption',
        inputs: 1,
    };
    static jumpReq = {
        name: 'jumpReq',
        title: 'Jumping Required',
    };

    static getMechSummaryStats ()
    {
        return {
            weight:this.weight, health:this.health, eneCap:this.eneCap,
            eneReg:this.eneReg, heaCap:this.heaCap, heaCol:this.heaCol,
            phyRes:this.phyRes, expRes:this.expRes, eleRes:this.eleRes,
        };
    }

    static get all ()
    {
        return WUMethods.map(Object.keys(this), statName => this[statName]);
    }
    
    static createImgs ()
    {
        WUMethods.loop(this.all, stat => stat.img = WUMethods.dom('img', { src:this.genSrc(stat) }));
    }
}