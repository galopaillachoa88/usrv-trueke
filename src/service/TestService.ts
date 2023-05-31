import { injectable } from "inversify";
import { ITestService } from "repository/ITestService";
import { Observable, of } from "rxjs";
import { tag } from "rxjs-spy/cjs/operators";
import { map } from "rxjs/operators";
import { TestResponse } from "types/test_response";

/**
 * Implementation asfag
 */
@injectable()
export class TestService implements ITestService {
  public helloWorld(): Observable<TestResponse> {
    return of(1).pipe(
      map(() => ({
        test: "hello world",
      })),
      tag("TestService | helloWorld")
    );
  }
}
