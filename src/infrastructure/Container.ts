/**
 *
 */
import {
  CONTAINER as CONT_CORE,
  IDENTIFIERS as ID_CORE,
  KushkiErrors,
} from "@kushki/core";
import { IDENTIFIERS } from "constant/Identifiers";
import { ErrorCode, ERRORS } from "infrastructure/ErrorEnum";
import { Container, interfaces } from "inversify";
import { ITestService } from "repository/ITestService";
import { TestService } from "service/TestService";

const CONT_APP: Container = new Container();

// Core
CONT_APP.bind<KushkiErrors<ErrorCode>>(ID_CORE.KushkiErrors).toConstantValue(
  ERRORS
);
// Service
CONT_APP.bind<ITestService>(IDENTIFIERS.TestService).to(TestService);

// Gateway

const CONTAINER: interfaces.Container = Container.merge(CONT_CORE, CONT_APP);

export { CONTAINER };
