const userReducer = (state, action) => {
  // eslint-disable-next-line default-case

  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      sessionStorage.setItem("isLogedIn", JSON.stringify(true));
      return {
        ...state,
        isLogedIn: true,
        userData: action.payload,
      };
    case "LOGOUT":
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("isLogedIn");
      return {
        ...state,
        isLogedIn: false,
        userData: {},
      };
    case "UPDATE":
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
