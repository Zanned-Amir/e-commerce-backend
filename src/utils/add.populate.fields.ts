const addPopulateFields = (fieldsToPopulate: string[]) => {
  return fieldsToPopulate.map((field) => ({
    path: field,
  }));
};

// Example usage
const fields = addPopulateFields(["product", "user"]);
console.log(fields); // Output: [{ path: "product" }, { path: "user" }]