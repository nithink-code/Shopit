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

let displayElements = (setShowComponent, value) => {
  setShowComponent(value);
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
  loginData,
  error,
  setLoading
) => {
  try {
    event.preventDefault();
    let { newErrors, err } = validateForm(loginData, error);
    validation(newErrors);
    if (!err) {
      loadBtn(setLoading, true);
      let authData = await axios.post(`/api/${route}`, loginData);
      if (authData.data.loginStatus === "successLogin") {
        toast.success("Logged in successfully ");
        navigate(`${authData.data.redirect}`);
      } else if (authData.data.loginStatus === "directLogin") {
        toast.success("Logged in successfully ");
        navigate(`${authData.data.redirect}`);
      } else if (authData.data === "failureLogin") {
        loadBtn(setLoading, false);
        toast.error("Either username or password is not valid");
      }
    }
  } catch (err) {
    console.log(err);
    loadBtn(setLoading, false);
  }
};

export { checkLogin, preventFormDefaultFunction };
