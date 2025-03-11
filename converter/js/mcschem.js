//Read and write .schem files using prismarine nbt
export const parseMcschem = async function (buffer) {
    const parsed = await pnbt.parseAs(buffer, "big", {
        noArraySizeCheck: true
    }).then(schem => {
        schem = schem.data.value;
        return schem.Schematic.value || schem;
    });

    return parsed;
};

export const writeMcschem = function (json) {
    return pnbt.writeUncompressed(json);
};