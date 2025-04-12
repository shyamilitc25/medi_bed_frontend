// ---------------mandatory intefaces---------------------------------------
export interface IFormInput {
  name: string;
  labelName: string;
  placeHolder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}


export interface IActionButton {
  name: string;
  onClick: (id: string) => void;
  testId?: string;
  variant?: "primary" | "secondary" | "danger"| "confirm"
}


export interface IButton {
  name: string;
  onClick: () => void;
  testId: string;
}
export interface ISidebarRoute {
  name: string;
  link: string;
}
export interface IFormSelectData {
  _id: string;
  name: string;
  value : string;
  label :string
}
export interface IFormSelect {
  name: string;
  labelName: string;
  data: IFormSelectData[];
}
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"| "confirm" | "success"
}
// --------------------------------------------------------------------------

