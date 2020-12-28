/** @format */

var storage = window.localStorage;

const LocalStorage = () => {
  return {
    setUser(obj) {
      storage.setItem("user_obj", JSON.stringify(obj));
    },
    getUser() {
      return JSON.parse(storage.getItem("user_obj"));
    },
    removeUser() {
      storage.removeItem("user_obj");
    },
  };
};

export default LocalStorage();
