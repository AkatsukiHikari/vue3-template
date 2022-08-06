declare interface Window{
    $message: any,
    $dialog: any,
}


declare interface Document{
    currentStyle: any
}

declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};


declare type Nullable<T> = T | null;


declare type LabelValueOptions = {
  label: string;
  value: any;
  disabled: boolean;
  [key: string]: string | number | boolean;
}[];


declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}