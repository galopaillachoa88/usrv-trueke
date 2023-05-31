/**
 *  Hello Handler
 */
import {
  ERROR_API_MIDDLEWARE,
  IDENTIFIERS as ID,
  IHandler,
  INPUT_OUTPUT_LOGS,
  IRollbar,
  SETUP_MIDDLEWARE,
  SSM_MIDDLEWARE,
} from "@kushki/core";
import { Handler } from "aws-lambda";
import { IDENTIFIERS } from "constant/Identifiers";
import { CONTAINER } from "infrastructure/Container";
import middy from "middy";
import "reflect-metadata";
import { ITestService } from "repository/ITestService";
import * as Rollbar from "rollbar";
import "source-map-support/register";

const CORE: IHandler = CONTAINER.get<IHandler>(ID.Handler);
const ROLLBAR: Rollbar = CONTAINER.get<IRollbar>(ID.Rollbar).init();
const HANDLER: middy.Middy<object, object> = middy<Handler<object>>(
  ROLLBAR.lambdaHandler(
    CORE.run<
      ITestService, // Service Definition
      object // Service observable resolve type
    >(
      IDENTIFIERS.TestService, // Service Instance
      "helloWorld", // Service Method
      CONTAINER,
      ROLLBAR
    )
  )
)
  // Middlewares (https://middy.js.org/)
  .use(SETUP_MIDDLEWARE(ROLLBAR))
  .use(INPUT_OUTPUT_LOGS(ROLLBAR))
  .use(ERROR_API_MIDDLEWARE(ROLLBAR))
  .use(SSM_MIDDLEWARE(ROLLBAR));

export { HANDLER };
