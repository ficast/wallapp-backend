const axios = require("axios");

const URL_BASE = 'http://localhost:3000/'

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
