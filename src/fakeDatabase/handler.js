const { REACT_APP_API } = process.env;

export const registerUser = (data) => {
  const user = {
    username: data[0],
    email: data[1],
    password: data[2],
    img: "",
    posts: [],
  };
  fetch(`http://${REACT_APP_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((element) => alert(`${element.username} registered!`))
    .catch((rej) => alert(" Something goes Wrong!"));
};
