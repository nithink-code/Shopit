let validateForm = (item, newErrors) => {
  let err = false;
  if (item.name === "") {
    newErrors.name.errMsg = "Name is required";
    newErrors.name.valid = true;
    err = true;
  }

  if (item.price === "" || item.price === "0") {
    newErrors.price.errMsg = "Price is required";
    newErrors.price.valid = true;
    err = true;
  }
  if (item.image === undefined) {
    newErrors.image.errMsg = "Enter a image";
    newErrors.image.valid = true;
    err = true;
  }
  if (item.description === "") {
    newErrors.description.errMsg = "Enter a valid descrption";
    newErrors.description.valid = true;
    err = true;
  }
  if (item.stock === "0" || item.stock === "") {
    newErrors.stock.errMsg = "Inventory is empty";
    newErrors.stock.valid = true;
    err = true;
  }

  return { newErrors, err };
};

export { validateForm };
