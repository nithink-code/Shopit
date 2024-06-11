let validateForm = (LoginData, newErrors) => {
  let err = false;
  if (LoginData.username === "") {
    newErrors.username.errMsg = "Name is required";
    newErrors.username.valid = true;
    err = true;
  }

  if (LoginData.password === "") {
    newErrors.password.errMsg = "Password  is required";
    newErrors.password.valid = true;
    err = true;
  }

  return { newErrors, err };
};

export { validateForm };
