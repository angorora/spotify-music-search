export const CHANGE_PAGE_TITLE = '[APP STATE] Change Page Title';
export const SAVE_NAVIGATED_ROUTE = '[AppState] Save navigated route';
export class NavigatedRoute {
  public static readonly type = SAVE_NAVIGATED_ROUTE;
  constructor(public url: string) {}
}

export class ChangePageTitle {
  static readonly type = CHANGE_PAGE_TITLE;
  constructor(public pageTitle: string) {}
}
