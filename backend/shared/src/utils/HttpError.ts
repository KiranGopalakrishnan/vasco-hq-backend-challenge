import * as trpc from '@trpc/server';

//Values should be matched to trpc error codes that are throwable , refer https://trpc.io/docs/v9/error-handling
export enum HttpError {
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export class ApplicationError extends Error {
  readonly _code: HttpError = HttpError.INTERNAL_SERVER_ERROR
  readonly _message: string = 'Something went wrong'

  constructor(code: HttpError = HttpError.INTERNAL_SERVER_ERROR, message: string = 'Something went wrong') {
    super(message);
    this._code = code
    this._message = message

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError)
    }
    console.error(code, message, this.stack)
    //Throw corresponding tRPC error
    //Throwing from the constructor is probably a bad idea , but trying to provide the same experience as the native Error class :(
    throw new trpc.TRPCError({
      code: this._code,
      message: this._message,
    });
  }

  fromError(e: unknown) {
    return new ApplicationError(HttpError.INTERNAL_SERVER_ERROR, (e as Error).message)
  }

}