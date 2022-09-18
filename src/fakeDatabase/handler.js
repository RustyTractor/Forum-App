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
    .catch((rej) => alert(" Something goes Wrong! " + rej));
};

export const updateUser = async (data) => {
  await fetch(`http://${REACT_APP_API}/users/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getUser = async (id) => {
  const response = await fetch(`http://${REACT_APP_API}/users/${id}`).then(
    (res) => {
      return res.json();
    }
  );
  console.log(response);
  return response;
};

export const getTheUserPosts = async (id) => {
  const posts = await fetch(`http://${REACT_APP_API}/post?userId=${id}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  return posts;
};

export const getPosts = async () => {
  const posts = await fetch(`http://${REACT_APP_API}/post/`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
  return posts;
};

export const addPost = async (post) => {
  await fetch(`http://${REACT_APP_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).catch((err) => console.log(err + ": something went wrong!"));
};

export const deletePost = async (postId) => {
  const response = await fetch(`http://${REACT_APP_API}/post/${postId}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log("Can't delete these post: " + err);
    });

  return await response;
};
