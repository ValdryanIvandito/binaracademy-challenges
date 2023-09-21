const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
let token = "";
jest.setTimeout(30000);

describe("This testing is for API:", () => {
  beforeAll(async () => {
    const credentials = {
      email: "user1@example.com",
      password: "password1",
    };

    const response = await request.post("/login").send(credentials);
    token = response._body.token;
  });

  it("Positive case: /login API testing, it should return 200 OK when valid credentials are provided", async () => {
    const credentials = {
      email: "user1@example.com",
      password: "password1",
    };

    const response = await request.post("/login").send(credentials);
    // console.log(response._body);

    expect(response.status).toBe(200);
    expect(Object.keys(response._body)).toContain("message", "email", "token");
  });

  it("Negative case: /login API testing, it should return 400 Unauthorized when invalid credentials are provided", async () => {
    const credentials = {
      email: "wrong@example.com",
      password: "wrong",
    };

    const response = await request.post("/login").send(credentials);
    // console.log(response._body);

    expect(response.status).toBe(400);
    expect(Object.keys(response.body)).toContain("message");
  });

  it("Positive case: /usergame/get, it should return 200 OK when valid credentials are provided", async () => {
    const credentials = {
      email: "user1@example.com",
    };

    const response = await request
      .post("/usergame/get")
      .send(credentials)
      .set({ authorization: token });
    // console.log(response._body.data);

    expect(response.status).toBe(200);
    expect(Object.keys(response._body.data)).toContain(
      "id",
      "username",
      "email"
    );
  });

  it("Negative case: /usergame/get, it should return 400 OK when valid credentials are provided", async () => {
    const credentials = {
      email: "wrong@example.com",
    };

    const response = await request
      .post("/usergame/get")
      .send(credentials)
      .set({ authorization: token });
    // console.log(response._body);

    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain("message");
  });

  it("Positive case: /usergame/insert API testing, it should return 200", async () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8;
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset.charAt(randomIndex);
    }

    const username = randomString;
    const email = `${username}@example.com`;

    const registerData = {
      username: username,
      email: email,
      password: "testplayer123",
      confirmPassword: "testplayer123",
    };

    const response = await request.post("/usergame/insert").send(registerData);
    // console.log(response._body);

    expect(response.status).toBe(200);
    expect(Object.keys(response._body)).toContain("status");
  });

  it("Negative case: /usergame/insert API testing, it should return 400", async () => {
    const registerData = {
      username: "user1",
      email: "user1@example.com",
      password: "testplayer123",
      confirmPassword: "testplayer",
    };

    const response = await request.post("/usergame/insert").send(registerData);
    // console.log(response._body);

    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain("message");
  });

  it("Positive case: /gamehistory/get/all API testing, it should return 200", async () => {
    const searchData = {
      gamename: "gamerps",
      email: "user1@example.com",
    };

    const response = await request
      .post("/gamehistory/get/all")
      .send(searchData);
    // console.log(response._body);

    expect(response.status).toBe(200);
  });

  it("Negative case: /gamehistory/get/all API testing, it should return 400", async () => {
    const searchData = {
      gamename: "gamex",
      email: "userx@example.com",
    };

    const response = await request
      .post("/gamehistory/get/all")
      .send(searchData);
    // console.log(response._body);

    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain("message");
  });

  it("Positive case: /gamehistory/get/rank API testing, it should return 200", async () => {
    const searchData = {
      gamename: "gamerps",
    };

    const response = await request
      .post("/gamehistory/get/rank")
      .send(searchData);

    expect(response.status).toBe(200);
  });

  return it("Negative case: /gamehistory/get/rank API testing, it should return 400", async () => {
    const searchData = {
      gamename: "gamex",
    };

    const response = await request
      .post("/gamehistory/get/rank")
      .send(searchData);
    console.log(response._body);

    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain("message");
  });
});
