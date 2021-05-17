const { processEvent } = require("../services/account-validator-service");

describe("Helper functions work", () => {
    test("processEvent works with correct post parameters", () => {
        var path = {
            accountId: "123test"
        };
        expect(processEvent({ pathParameters : path })).toMatchObject(path);
    });

    test("processEvent throws error when invoked without Account Id", () => {
      expect.assertions(1);
      try {
          processEvent({ pathParameters : {} });
      } catch (e) {
        expect(e).toEqual({ code: 400, message: 'missing Account Id'});
      }
    });
});