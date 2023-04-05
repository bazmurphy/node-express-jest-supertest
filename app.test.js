const request = require("supertest");
const app = require("./app");

describe("POST /users", () => {
  describe("given a username and password", () => {
    // should save the username and password to the database
    // should response with a json object containing the user id

    test("test1: should respond with a 200 status code", async () => {
      // we use the supertest request function and we pass in the HTTP Server Object "app"
      // then we make a POST reques to the /users endpoint to create a new user
      // we provide it an object with username and password
      // supertest will take the HTTP server and it will bind it to whatever port it wants
      // and then it exposes the interface so we can just chain whatever request we want to make onto the end of the request function
      // and we get back a Response Object which we store in response
      // and we can use that with the Jest Expect function to test certain things
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });

    test("test2: should specify json in the content type header (so the client knows they are recieving json)", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      // using the jest stringContaining function to check if the header content type contains json
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });

    test("test3: the response has a userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      // the response should have a json object in its body
      // and we will get he userId from it and expect it to be defined
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400 (user error)", async () => {
      // const response = await request(app).post("/users").send({
      //   // username: "username",
      //   // password: "password",
      // });
      // // expect the statusCode to be 400
      // expect(response.statusCode).toBe(400);

      const bodyData = [{}, { username: "username" }, { password: "password" }];
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
