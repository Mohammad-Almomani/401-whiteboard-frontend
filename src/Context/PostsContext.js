import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { PostReducer } from "../reducers/PostsReducer";
import { gitPostsAction } from "../actions/PostsActions";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

const PostContextProvider = (props) => {
  const initialState = {
    post: null,
  };
  const [posts, dispatch] = useReducer(PostReducer, initialState);

  const gitPosts = async () => {
    gitPostsAction(dispatch);
  };

  const value = {
    gitPosts,
    post: posts.post,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};

export default PostContextProvider;
