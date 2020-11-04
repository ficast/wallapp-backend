require("dotenv").config();
const axios = require("axios");
const authAsAdmin = require("../authAsAdmin");

const URL_BASE = `${process.env.URL_BASE}/user`;

describe("Testing /user route", () => {
  test("List all Users ", async () => {
    const response = await axios.get(URL_BASE);
    expect(response.status).toEqual(200);
    expect(response.data).toContainEqual({
      name: "Filipe Oliveira",
      _id: "5f94cd241edffe34020cb923",
    });
    expect(response.data.length).toBeGreaterThan(0);
  });

  test("Create new User ", async () => {
    const response = await axios.post(URL_BASE, {
      name: "Test User",
      email: "test@user.com",
      password: "123456789",
    });
    expect(response.status).toEqual(201);
    expect(response.data.message).toEqual("User registration with success!");
  });

  test("Create existent User ", async () => {
    try {
      await axios.post(URL_BASE, {
        name: "Test User",
        email: "test@user.com",
        password: "123456789",
      });
    } catch (err) {
      expect(err.response.status).toEqual(409);
      expect(err.response.data.message).toEqual("User already exists!");
    }
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

test("Refresh token without auth", async () => {
  try {
    await axios.post(`${URL_BASE}/refresh-token`);
  } catch (err) {
    expect(err.response.status).toEqual(401);
    expect(err.response.data.message).toEqual("Restricted Access");
  }
});

test("Refresh token", async () => {
  const token = await authAsAdmin();
  response = await axios.post(`${URL_BASE}/refresh-token`, { token });
  expect(response.status).toEqual(201);
  expect(response.data.token).toBeDefined();
});
