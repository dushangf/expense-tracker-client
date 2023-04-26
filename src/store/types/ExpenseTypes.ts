export type Expense = Record<string, any>;

export interface InitialState {
  list: {
    data: Expense[];
    error: boolean;
    pending: boolean;
  };
  details: {
    error: boolean;
    pending: boolean;
    data: Expense;
  };
  post: {
    error: boolean;
    pending: boolean;
    data: Expense;
  };
  update: {
    error: boolean;
    pending: boolean;
    data: Expense;
  };
  delete: {
    error: boolean;
    pending: boolean;
    data: Expense;
  };
}
