export enum DomainErrorCode {
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export class DomainError extends Error {
  readonly code: DomainErrorCode = DomainErrorCode.INTERNAL_SERVER_ERROR
  readonly message: string = 'Something went wrong'

  constructor(code: DomainErrorCode = DomainErrorCode.INTERNAL_SERVER_ERROR, message: string = 'Something went wrong') {
    super(message);
    this.code = code
    this.message = message
    console.error(code, message, this.stack)
  }

  fromError(e: unknown) {
    return new DomainError(DomainErrorCode.INTERNAL_SERVER_ERROR, (e as Error).message)
  }

}