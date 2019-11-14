import { State, Action, StateContext, Selector } from "@ngxs/store";
import { User } from "../../shared/user.interface";
import { GetUsers, GetUser } from "./users.action";
import { DatabaseService } from "src/app/shared/db.service";
import { tap } from "rxjs/operators";

export class UsersStateModel {
  users: User[];
}

export class UserStateModel {
  user: User[]
}

@State<UsersStateModel>({
  name: "users",
  defaults: {
    users: []
  }
})

@State<UserStateModel>({
  name: "user",
  defaults: {
    user: []
  }
})

export class UsersState {
  constructor(private db: DatabaseService) {}

  @Selector()
  static getUsersList(state: UsersStateModel) {
    return state.users;
  }

  @Selector()
  static getUserInformation(state: UserStateModel) {
    return state.user;
  }

  @Action(GetUsers)
  getUsers({ getState, patchState }: StateContext<UsersStateModel>) {
    return this.db.getUsers().pipe(
      tap(result => {
        const state = getState();
        patchState({
          ...state,
          users: result
        });
      })
    );
  }

@Action(GetUser)
getUser({ getState, patchState }: StateContext<UserStateModel>, {payload}: GetUser) {
  return this.db.getUser(payload.id).pipe(
    tap(result => {
      const state = getState();
      patchState({
        ...state,
        user: result
      });
    })
  );
}

}
