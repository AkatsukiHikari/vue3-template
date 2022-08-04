declare interface Window{
    $message: any
}


declare interface Document{
    currentStyle: any
}

declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};