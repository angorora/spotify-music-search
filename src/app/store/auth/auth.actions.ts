export const GET_TOKEN = '[AUTH] Login action';

export class GetToken {
  static readonly type = GET_TOKEN;
}

export type AuthActions = GetToken;
