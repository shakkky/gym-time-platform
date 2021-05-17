const { processEvent } = require("../services/account-create-service");

describe("Helper functions work", () => {
    test("processEvent works with correct post body", () => {
        var body = {
            accountId: "test",
            name: "test",
            email: "test",
            password: "test"
        };
        expect(processEvent({ body : body })).toMatchObject(body);
    });

    test("processEvent throws error when invoked without Account Id", () => {
      var body = {
          name: "test",
          email: "test",
          password: "test"
      };
      expect.assertions(1);
      try {
          processEvent({ body : body });
      } catch (e) {
        expect(e).toEqual({ code: 400, message: 'missing Account Id'});
      }
    });

    test("processEvent throws error when invoked without name", () => {
      var body = {
          accountId: "test",
          email: "test",
          password: "test"
      };
      expect.assertions(1);
      try {
          processEvent({ body : body });
      } catch (e) {
        expect(e).toEqual({ code: 400, message: 'missing name'});
      }
    });

    test("processEvent throws error when invoked without email", () => {
      var body = {
          accountId: "test",
          name: "test",
          password: "test"
      };
      expect.assertions(1);
      try {
          processEvent({ body : body });
      } catch (e) {
        expect(e).toEqual({ code: 400, message: 'missing email'});
      }
    });

    test("processEvent throws error when invoked without password", () => {
      var body = {
          accountId: "test",
          name: "test",
          email: "test",
      };
      expect.assertions(1);
      try {
          processEvent({ body : body });
      } catch (e) {
        expect(e).toEqual({ code: 400, message: 'missing password'});
      }
    });
});