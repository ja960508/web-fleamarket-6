import React, { createContext, useReducer } from 'react';

interface UserInfoContextType {
  userId: number;
  name: string;
  region: string;
  regionId: number;
  isLogin: boolean;
}

interface ActionType<T> {
  type: string;
  payload?: T;
}

type UserInfoActionsType = typeof userInfoActions[keyof typeof userInfoActions];

export const createAction = <A,>(
  type: UserInfoActionsType,
  payload?: A,
): ActionType<A> => {
  if (!payload) {
    return {
      type,
    };
  }

  return {
    type,
    payload,
  };
};

const SET_USER = 'USERINFO/SET_USER';
const DELETE_USER = 'USERINFO/DELETE_USER';
const CHANGE_REGION = 'USERINFO/CHANGE_REGION';

export const userInfoActions = {
  SET_USER,
  DELETE_USER,
  CHANGE_REGION,
} as const;

const initialUserInfo: UserInfoContextType = {
  userId: 0,
  name: '',
  region: '',
  regionId: 0,
  isLogin: false,
};

export const UserInfoContext =
  createContext<UserInfoContextType>(initialUserInfo);
export const UserInfoDispatch = createContext<
  React.Dispatch<ActionType<unknown>>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
>(null!);

function userInfoReducer<T>(state: UserInfoContextType, action: ActionType<T>) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload, isLogin: true };
    case DELETE_USER:
      return { ...initialUserInfo };
    case CHANGE_REGION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, userInfoDispatch] = useReducer(
    userInfoReducer,
    initialUserInfo,
  );

  return (
    <UserInfoContext.Provider value={userInfo}>
      <UserInfoDispatch.Provider value={userInfoDispatch}>
        {children}
      </UserInfoDispatch.Provider>
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;
