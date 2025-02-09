const request = require("supertest");
const app = require("../server"); // path to your Express app
const mongoose = require("mongoose");
const User = require("../models/userModel");

// Connect to the database before tests
beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up database after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Test registration
describe("POST /api/users/register", () => {
  it("should create a new user and return 201 status code", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered");
  });
});

// Test login
describe("POST /api/users/login", () => {
  it("should login the user and return a JWT token", async () => {
    // First, register the user
    await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });

    // Then, login the user
    const res = await request(app).post("/api/users/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

// Test protected route
describe("GET /api/users/profile", () => {
  it("should return user profile when token is provided", async () => {
    // First, register the user and login to get the token
    const registerRes = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });
    const loginRes = await request(app).post("/api/users/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });

    // Use the token to access the protected route
    const res = await request(app)
      .get("/api/users/profile")
      .set("Cookie", `token=${loginRes.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", "johndoe@example.com");
  });
});
