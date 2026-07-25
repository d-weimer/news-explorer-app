export const registerUser = ({ email, password, name }) => {
  return new Promise((resolve) => {
    const newUser = {
      _id: "fake-user-id-" + Date.now(),
      name: name || "User",
      email: email,
    };

    localStorage.setItem("mockUser", JSON.stringify(newUser));

    resolve({ data: newUser });
  });
};

export const authorizeUser = ({ email, password }) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-jwt-token-xyz789" });
  });
};

export const getUserInfo = (token) => {
  return new Promise((resolve) => {
    const savedUser = JSON.parse(localStorage.getItem("mockUser")) || {
      _id: "fake-user-id-12345",
      name: "User",
      email: "user@example.com",
    };

    resolve({
      data: savedUser,
    });
  });
};
