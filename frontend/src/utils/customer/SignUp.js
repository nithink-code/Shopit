let checkLogin = async (axios, navigate, toast, setShowComponent) => {
  try {
    let status = await axios.get("/api/loginForm/isLoggedIn");
    if (status.data === "LoggedIn") {
      toast.warn("You are logged in");
      navigate("/");
    } else {
      displayElements(setShowComponent, true);
    }
  } catch (err) {
    console.log(err);
    toast.warn("some error occured");
    navigate("/");
  }
};

let loadBtn = (setLoading, value) => {
  setLoading(value);
};

let preventFormDefaultFunction = async (
  event,
  route,
  axios,
  toast,
  navigate,
  validateForm,
  validation,
  setShowComponent,
  signUpData,
  error,
  setLoading
) => {
  try {
    event.preventDefault();
    let { newErrors, err } = validateForm(signUpData, error);
    validation(newErrors);
    if (!err) {
      loadBtn(setLoading, true);
      let authData = await axios.post(`/api/${route}`, signUpData);
      displayElements(setShowComponent, false);
      if (authData.data.signUpStatus === "success signUp") {
        toast.success("Account Created Successfully");
        navigate(`${authData.data.redirect}`);
      } else if (authData.data.signUpStatus === "directSignUp") {
        toast.success("Account Created Successfully");
        navigate(authData.data.redirect);
      } else if (authData.data === "signUpError") {
        loadBtn(setLoading, false);
        displayElements(setShowComponent, true);
        toast.error("Username  already exists");
      }
    }
  } catch (err) {
    loadBtn(setLoading, false);
    console.log(err);
    if (err.response.data === '"email" must be a valid email') {
      toast.error(err.response.data);
    }
  }
};

let displayElements = (setShowComponent, value) => {
  setShowComponent(value);
};

export { checkLogin, preventFormDefaultFunction };
