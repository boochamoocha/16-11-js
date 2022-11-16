const _ = require('lodash');

function fetchGracePeriodLogicFromMapping (cardId, mapping = '') {
    const formattedMapping = CutSpacesFrom(mapping);
    const relations = GetRelations(formattedMapping);
    const id = Number(cardId);
    const cardIdsNames= relations.idsToNames[id];

    if (!cardIdsNames) return null;

    let inc = 0;

    while (true) {
        for (let i = 0; i !== cardIdsNames.length; ++i) {
            const name = cardIdsNames[i];

            if (relations.nameToIds[name][inc] == id) return name;
        }
        ++inc;
    }
}

function CutSpacesFrom(str) {
    return str.replace(/ /g, '');
}

/**
 * @return { nameToIds: Record<name, Array<id>>, idsToNames: Record<id, Array<name>> }
 */
function GetRelations(mapping) {
    const flattenMapping = mapping.split(/[;]/g)
                                  .map(elem => elem.split(/[:,]/g));

    let relations = {nameToIds: {}, idsToNames: {}};

    for (let elem of flattenMapping) {
        const elemName = elem[0];

        relations.nameToIds[elemName] = [];

        for (let i = 1; i !== elem.length; ++i) {
            const idsVector = relations.nameToIds[elemName];
            const id = Number(elem[i]);

            idsVector.push(id);

            if (!relations.idsToNames[id]) {
                relations.idsToNames[id] = [];
            }

            relations.idsToNames[id].push(elemName);
        }
    }

    return relations;
}

module.exports = {
    fetchGracePeriodLogicFromMapping,
    CutSpacesFrom,
    GetRelations
};
