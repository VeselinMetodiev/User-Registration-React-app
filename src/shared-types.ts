export type IdType = number | undefined

export type Identifiable<K> = {id: K }

export enum AppState {
    Registration, Login, InApp
}

export type FormFieldDict<Value> = {
    [field: string]: Value
};

export type Optional<V> = V | undefined