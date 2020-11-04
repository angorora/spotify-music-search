export interface HttpErrorModel {
  status?: number;
  statusText?: string;
  message?: string;
  error?: any;
  ok?: false;
}
