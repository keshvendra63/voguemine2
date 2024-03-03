export const base_url="https://probable-halibut-r94v5r7gwjrhxgvj-5000.preview.app.github.dev/api/"
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};