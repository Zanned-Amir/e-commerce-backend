import UserService from '../user.service';
import DB from "../../config/database";
import hash from "../../utils/hashing";
import {User} from 'models/index';

describe("UserService", () => {
  let database: DB;
  let userService: UserService;

  beforeAll(async () => {
    userService = new UserService();
    database = new DB(true);
    await database.connect();
  });

  afterAll(async () => {
    await database.drop();
    await database.disconnect();
  });

  // Describe block for user creation tests
  describe("User Creation Tests", () => {

    beforeEach(async () => {
      // Clean up users before each test
      await User.deleteMany({});
    });

    it("should create a user", async () => {
      const user = {
        username: "test",
        email: "test@gmail.com",
        password: "@Password1",
        password_confirm: "@Password1"
      };

      const newUser = await userService.createUser(user);
      expect(newUser).toHaveProperty("_id");
      expect(newUser).toHaveProperty("username", "test");
      expect(newUser).toHaveProperty("email", "test@gmail.com");
      expect(await hash.comparePassword("@Password1", newUser.password)).toBe(true);
    });

    it("should raise an error if the password and password_confirm do not match", async () => {
      const user = {
        username: "test",
        email: "test1@gmail.com",
        password: "@Password1",
        password_confirm: "@P"
      };

      await expect(userService.createUser(user)).rejects.toThrow('User validation failed: password_confirm: Passwords are not the same');
    });

    it("should raise an error if the password is not strong", async () => {
      const user = {
        username: "test",
        email: "test1@gmail.com",
        password: "assword1",
        password_confirm: "assword1"
      };

      await expect(userService.createUser(user)).rejects.toThrow('User validation failed: password: Please provide a strong password');
    });

    it("should prevent duplicated email", async () => {
      const user = {
        username: "test",
        email: "test@gmail.com",
        password: "@Password1",
        password_confirm: "@Password1"
      };

      await userService.createUser(user);

      await expect(userService.createUser(user)).rejects.toThrow('E11000 duplicate key error collection');
    });

  });


  // Describe block for user retrieval tests
  describe("User Retrieval Tests", () => {

    beforeEach(async () => {
      // Seed users before each test
      await User.deleteMany({});
      for (let i = 0; i < 10; i++) {
        await userService.createUser({
          username: "test" + i,
          email: "test" + i + "@gmail.com",
          password: "@Password" + i,
          password_confirm: "@Password" + i
        });
      }
    });

    it("should get all users", async () => {
      const users = await userService.getUsers();
      expect(users).toHaveLength(10);
      expect(users[0]).toHaveProperty("username", "test0");
    });

    it("should get a user by id", async () => {
          const users = await userService.getUsers();
          const user = await userService.getUserById(users[0]._id);
          expect(user).toHaveProperty("username", "test0");
              });

          });

          describe("Update User Tests", () => {
                    beforeEach(async () => {
                      await User.deleteMany({});
                      const user = {
                              username: "test",
                              email: "test@gmail.com",
                              password: "@Password1",
                              password_confirm: "@Password1"
                            };
                              await userService.createUser(user);
                    });

                    it("should update a user", async () => {
                      const users = await userService.getUsers();
                      const user = await userService.updateUser(users[0]._id, { username: "updated" });
                      expect(user).toHaveProperty("username", "updated");
                    });

                    it("should deactivate a user", async () => {
                      const users = await userService.getUsers();
                      const user = await userService.deactivateUser(users[0]._id);
                      expect(user).toHaveProperty("status", "inactive");
                    });

                    it("should delete a user", async () => {
                      const users = await userService.getUsers();
                      await userService.deleteUser(users[0]._id);
                      const count = await userService.countUsers();
                      expect(count).toBe(0);
                    });

          });


});
