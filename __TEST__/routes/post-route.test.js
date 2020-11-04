require("dotenv").config();
const axios = require("axios");
const authAsAdmin = require("../authAsAdmin");

const URL_BASE = `http://localhost:3000/post`;

describe("Testing /post route", () => {
  test("List all posts ", async () => {
    const response = await axios.get(URL_BASE);
    expect(response.status).toEqual(200);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test("List last 10 posts ", async () => {
    const response = await axios.get(`${URL_BASE}/?page=0`);
    expect(response.status).toEqual(200);
    expect(response.data.length).toBe(10);
  });

  test("Create new post ", async () => {
    const token = await authAsAdmin();
    console.log(token);
    const response = await axios.post(URL_BASE, {
      title: "Loren ex",
      body:
        "Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      token,
    });
    expect(response.status).toEqual(201);
    expect(response.data.message).toEqual("Post successfully created");
  });
});
