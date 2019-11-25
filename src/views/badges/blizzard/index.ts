
interface BlizzardBadgeParams {
    zoneName: string;
    progress: string;
    progressPercent: number;
    region: string;
}

interface IEncounterAliasMap {
    [index: string]: string;
};

const encounterAliasMap: IEncounterAliasMap = {
    'Onyxia': 'Onyxia\'s Lair'
};

const smallTemplate = ({ zoneName, progress, progressPercent, region }: BlizzardBadgeParams) => {

    const encounterName = encounterAliasMap[zoneName] || zoneName;
    
    const cleanZoneName = encounterName.toLowerCase().replace(/'/gi, '').replace(/ /gi, '-');
    const backgroundUrl = `https://render-${region.toLowerCase()}.worldofwarcraft.com/zones/${cleanZoneName}-small.jpg`;
    
    return `
    <div style="display: flex; align-items: center; font-family: Sans-serif; position: relative; padding: 7px 0px; width: 200px; background-image: url('${backgroundUrl}'); background-size: cover; border-radius: 8px; overflow: hidden; ">
        <div style="top: 0; left: 0; bottom: 0; right: 0; position: absolute; background-color: rgba(0, 0, 0, 0.2);"></div>
        <p style="margin: 0; padding: 0px 0 0px 15px; font-weight: bold; color: white; line-height: 1; text-shadow: 0 0 1px transparent, 0 1px 2px rgba(0,0,0,.8); z-index: 1; border-radius: 5px;">${encounterName}</p>
        <div style="background-color: rgba(0, 0, 0, 0.7); position: relative; margin-left: auto; margin-right: 7px; height: 100%;">
        <div style="position: relative; padding: 5px;">
            <p style="margin: 0; padding: 0 5px; font-size: 12px; line-height: 18px; color: white; font-weight: bold;">${progress}</p>
        </div>
        </div>
    </div>
    `
}

const template = ({ zoneName, progress, progressPercent, region }: BlizzardBadgeParams) => {

    const encounterName = encounterAliasMap[zoneName] || zoneName;
    
    const cleanZoneName = encounterName.toLowerCase().replace(/'/gi, '').replace(/ /gi, '-');
    const backgroundUrl = `https://render-${region.toLowerCase()}.worldofwarcraft.com/zones/${cleanZoneName}-small.jpg`;

    return `
        <div style="font-family: Sans-serif; position: relative; padding: 15px 15px; width: 200px; background-image: url('${backgroundUrl}'); background-size: cover; border-radius: 2px;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 1px solid hsla(0,0%,100%,.2); background-color: transparent; z-index: 1;"></div>
            <p style="margin: 0; margin-bottom: 10px; font-weight: bold; color: white; line-height: 1; text-shadow: 0 0 1px transparent, 0 1px 2px rgba(0,0,0,.8)">${encounterName}</p>
            <div style="background-color: #181818; box-shadow: inset 0 0 16px #000; position: relative;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 1px solid hsla(0,0%,100%,.2); background-color: transparent; z-index: 1;"></div>
                <div style="position: absolute; top: 0; left: 0; bottom: 0; background-image: linear-gradient(90deg, rgb(13, 74, 0) 0px, rgb(27, 150, 1)); width: ${progressPercent}%;"></div>
                <div style="position: relative; padding: 5px;">
                <p style="margin: 0; margin-left: 10px; font-size: 12px; line-height: 18px; color: white; font-weight: bold;">${progress}</p>
                </div>
            </div>
        </div>
    `
}

export default smallTemplate;