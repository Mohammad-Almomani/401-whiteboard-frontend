import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import cookies from "react-cookies";
import Swal from "sweetalert2";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

const PostContextProvider = (props) => {
  const [post, setPost] = useState(null);

  const gitPosts = async () => {
    const allPosts = await axios.get(`${process.env.REACT_APP_BACKEND}/post`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });

    setPost(allPosts.data);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.REACT_APP_BACKEND}/post/${id}`, {
            headers: {
              Authorization: `Bearer ${cookies.load("token")}`,
            },
          })
          .then((res) => {
            gitPosts();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops, seems like you are not authorized!",
              text: "Something went wrong!, Please Contact Admin",
            });
          });
      }
    });
  };

  const value = {
    gitPosts,
    post,
    handleDelete,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};

export default PostContextProvider;
