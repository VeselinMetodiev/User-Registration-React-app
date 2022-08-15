import { AppState } from "./shared-types";
import { User, UserStatus } from "./user.model";

export interface UserListener {
    (user: User): void;
  }
  
  export interface FilterChangeListener {
    (filter: FilterType): void;
  }
  
  export interface AppStateListener {
    (st: AppState) : void;
  }
  
  export type FilterType = UserStatus | undefined;
  