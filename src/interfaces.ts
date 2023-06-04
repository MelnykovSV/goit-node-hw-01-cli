export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IInvokeActionsArgs {
  action: string;
  id: string;
  name: string;
  email: string;
  phone: string;
}
