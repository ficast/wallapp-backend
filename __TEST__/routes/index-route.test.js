require("dotenv").config();
const axios = require("axios");

const URL_BASE = process.env.URL_BASE;

describe("Testing / route", () => {
  test("Check API response GET on / ", async () => {
    const response = await axios.get(URL_BASE);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({
      title: "The Wall App",
      version: "0.0.2",
    });
  });
});
