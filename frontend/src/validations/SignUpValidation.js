let validateForm = (signUpData, newErrors) => {
  let err = false;
  if (signUpData.username === "") {
    newErrors.username.errMsg = "Name is required";
    newErrors.username.valid = true;
    err = true;
  }

  if (signUpData.email === "") {
    newErrors.email.errMsg = "Enter a email";
    newErrors.email.valid = true;
    err = true;
  }

  if (signUpData.password === "") {
    newErrors.password.errMsg = "Password  is required";
    newErrors.password.valid = true;
    err = true;
  }

  return { newErrors, err };
};

export { validateForm };
