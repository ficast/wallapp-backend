const axios = require("axios");
require("jest");

const URL_BASE = "http://localhost:3000/user";

const authAsAdmin = async () => {
  const response = await axios.post(`${URL_BASE}/authenticate`, {
    email: "filipeyoga@gmail.com",
    password: 123456789,
  });
  return response.data.token;
};

describe("Testing /user route", () => {
  test("List every User ", async () => {
    const response = await axios.get(URL_BASE);
    expect(response.status).toEqual(200);
    expect(response.data).toContainEqual({
      name: "Filipe Oliveira",
      _id: "5f94cd241edffe34020cb923",
    });
    expect(response.data.length).toBeGreaterThan(0);
  });

  test("Create User ", async () => {
    const response = await axios.post(URL_BASE, {
      name: "Test User",
      email: "test@user.com",
      password: "123456789",
    });
    expect(response.status).toEqual(201);
    expect(response.data.message).toEqual("User registration with success!");
  });

  test("Delete User ", async () => {
    const token = await authAsAdmin();
    const response = await axios.delete(`${URL_BASE}/delete`, {
      data: {
        token,
        email: "test@user.com",
      },
    });
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual("User successfully deleted");
  });
});
