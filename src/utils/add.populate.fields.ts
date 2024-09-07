const addPopulateFields = (fieldsToPopulate: any[]) => {
  return fieldsToPopulate.map((field) => ({
    path: field[0],
    select: field[1] ? field[1] : '',
  }));
};

export default addPopulateFields;