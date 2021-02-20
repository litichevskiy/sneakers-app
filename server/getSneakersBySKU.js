const getSneakersBySKU = ( list, sku ) => {
  let result = false;
  sku = sku.toLowerCase();

  list.some(( item, index ) => {
    if( item.sku.toLowerCase() === sku ) return result = item;
  });

  return result;
};

module.exports = getSneakersBySKU;