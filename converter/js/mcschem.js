//Read and write .schem files using prismarine nbt
export const parseMcschem = async function (buffer) {
    const parsed = await pnbt.parseAs(buffer, "big", {
        noArraySizeCheck: true
    }).then(schem => {
        schem = pnbt.simplify(schem.data);
        if(schem.Schematic) {
            schem = schem.Schematic;
        }
        const json = {
            size: [
                schem.Width,
                schem.Height,
                schem.Length
            ]
        };
        switch(schem.Version) {
            case 1:
            case 2:
                json.blocks = schem.BlockData;
                json.palette = schem.Palette;
                break;
            case 3:
                json.blocks = schem.Blocks.Data;
                json.palette = schem.Blocks.Palette;
                break;
            default: throw new Error("Unsupported schematic version.");
        }

        return json;
    });

    return parsed;
};

export const writeMcschem = function (json) {
    return pnbt.writeUncompressed(json);
};