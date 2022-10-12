import { actionType } from '../types/AuthActionTypes';

export const PostReducer = (state, action) => {
  switch (action.type) {
    case actionType.FETCH_POSTS:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
}