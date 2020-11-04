import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HTTPError, ResetError, ApiError } from './error.actions';
import { HttpErrorModel } from '../../shared/models/http-error.model';

@State<HttpErrorModel>({
  name: 'errors',
  defaults: {
    message: '',
    status: 0,
  },
})
@Injectable()
export class ErrorState {
  @Selector()
  static errorMessage(state: HttpErrorModel) {
    let message;

    switch (state.status) {
      case 401:
        message = 'Not Authorized to use Spotify API';
        break;
      case 200:
        message = state.message;
        break;
      case 500:
        message = 'Action failed please try again';
        break;
      default:
        message = '';
    }
    return message;
  }
  @Selector()
  static apiErrorMessage(state: HttpErrorModel) {
    return state.message;
  }

  @Action(HTTPError)
  serverError(stateContext: StateContext<HttpErrorModel>, action: HTTPError) {
    const state = stateContext.getState();
    stateContext.setState({
      ...state,
      ...action,
    });
  }
  @Action(ApiError)
  apiError(stateContext: StateContext<HttpErrorModel>, action: ApiError) {
    const state = stateContext.getState();
    stateContext.setState({
      ...state,
      message: action.error.message,
      status: action.error.status,
    });
  }
}
