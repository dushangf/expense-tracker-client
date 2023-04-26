export type User = Record<string, any>;

export interface InitialState {
  details: {
    error: boolean;
    pending: boolean;
    data: User;
  };
  post: {
    error: boolean;
    pending: boolean;
    data: User;
  };
  update: {
    error: boolean;
    pending: boolean;
    data: User;
  };
  delete: {
    error: boolean;
    pending: boolean;
    data: User;
  };
}
