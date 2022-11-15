//Values should be matched to trpc error codes that are throwable , refer https://trpc.io/docs/v9/error-handling
import {TRPCError} from "@trpc/server";
import {DomainError, DomainErrorCode} from "./DomainError";

//Values should be matched to trpc error codes that are throwable , refer https://trpc.io/docs/v9/error-handling
//TODO: Refactor , this might be a hidden detail , find a way to make this mapping of trpc to http error code explicit
export enum HttpErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export class HttpError extends Error {
  constructor(code: HttpErrorCode = HttpErrorCode.INTERNAL_SERVER_ERROR, message: string = 'Something went wrong') {
    super(message);

    console.error(code, message, this.stack)
    //I think this is a bad idea, maybe this should be in a global error handler , keeping this as is for now ,but might be a good candidate for a future refactor
    throw new TRPCError({message, code})
  }

  static fromDomainError(e: DomainError): HttpError {
    return new HttpError(HttpError.mapDomainErrorCodeToTRPCErrorCode(e.code), e.message)
  }

  private static mapDomainErrorCodeToTRPCErrorCode(code: DomainErrorCode): HttpErrorCode {
    const errorCodeMap = {
      [DomainErrorCode.BUSINESS_RULE_VIOLATION]: HttpErrorCode.BAD_REQUEST,
      [DomainErrorCode.NOT_FOUND]: HttpErrorCode.NOT_FOUND,
      [DomainErrorCode.INTERNAL_SERVER_ERROR]: HttpErrorCode.INTERNAL_SERVER_ERROR
    }
    return errorCodeMap[code] || HttpErrorCode.INTERNAL_SERVER_ERROR
  }
}