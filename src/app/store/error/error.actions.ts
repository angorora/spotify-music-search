import { State, Action } from '@ngxs/store';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorModel } from '../../shared/models/http-error.model';
export const SERVER_ERROR = '[ERROR] HTTP Server Error';
export const RESET_ERROR = '[ERROR] Clear Errors';
export const API_ERROR = '[ERROR] API Error';
export class HTTPError {
  static readonly type = SERVER_ERROR;
  constructor(public error: HttpErrorModel) {}
}
export class ResetError {
  static readonly type = RESET_ERROR;
}
export class ApiError {
  static readonly type = API_ERROR;
  constructor(public error: { status: number; message: string }) {}
}
