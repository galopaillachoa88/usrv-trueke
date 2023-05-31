/**
 *
 */
import { KushkiErrors, StatusCodeEnum } from "@kushki/core";

export enum ErrorCode {
  E001 = "E001",
}

export const ERRORS: KushkiErrors<ErrorCode> = {
  [ErrorCode.E001]: {
    code: ErrorCode.E001,
    message: "Cuerpo de la petición inválido.",
    statusCode: StatusCodeEnum.BadRequest,
  },
};
