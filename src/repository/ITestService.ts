import { Observable } from "rxjs";

/**
 * TestService Interface
 */
export interface ITestService {
  /**
   * hello world method
   */
  helloWorld(): Observable<object>;
}
