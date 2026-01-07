const parseJSON = (fields) => (row) => {
    if (!row) return row;
    const result = { ...row };
    fields.forEach(field => {
        if (result[field] && typeof result[field] === 'string') {
            try {
                result[field] = JSON.parse(result[field]);
            } catch (e) {
                console.error(`Error parsing JSON for field ${field} in row ${row.id}:`, result[field]);
                // Mantıklı varsayılanlar ata
                if (field === 'projeler' || field === 'islemler' || field === 'oncekiDestekler') {
                    result[field] = [];
                } else {
                    result[field] = {};
                }
            }
        }
    });
    return result;
};

const stringifyJSON = (fields) => (data) => {
    if (!data) return data;
    const result = { ...data };
    fields.forEach(field => {
        if (result[field] && typeof result[field] !== 'string') {
            result[field] = JSON.stringify(result[field]);
        }
    });
    return result;
};

module.exports = {
    parseJSON,
    stringifyJSON,
};
