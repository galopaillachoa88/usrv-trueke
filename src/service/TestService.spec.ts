/**
 * TestService Service Unit Tests
 */
import { expect, use } from "chai";
import { IDENTIFIERS } from "constant/Identifiers";
import { CONTAINER } from "infrastructure/Container";
import { ITestService } from "repository/ITestService";
import { createSandbox, SinonSandbox } from "sinon";
import * as sinonChai from "sinon-chai";

use(sinonChai);

describe("TestService", () => {
  describe("helloWorld", () => {
    let sandbox: SinonSandbox;
    let service: ITestService;

    beforeEach(() => {
      CONTAINER.snapshot();
      sandbox = createSandbox();
    });

    afterEach(() => {
      CONTAINER.restore();
      sandbox.restore();
    });

    it("should return hello world", (done: Mocha.Done) => {
      service = CONTAINER.get<ITestService>(IDENTIFIERS.TestService);
      service.helloWorld().subscribe({
        next: (response: object): void => {
          expect(response).to.haveOwnProperty("test", "hello world");
          done();
        },
      });
    });
  });
});
