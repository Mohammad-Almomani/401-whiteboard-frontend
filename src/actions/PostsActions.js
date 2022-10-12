import axios from "axios";
import cookies from "react-cookies";
import Swal from "sweetalert2";
import { actionType } from "../types/AuthActionTypes";

export const editPostAction = async (id, post, gitPosts) => {
  await axios
    .put(`${process.env.REACT_APP_BACKEND}/post/${id}`, post, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    })
    .then((res) => {
      Swal.fire("Post Updated Successfully!", "", "success");
      gitPosts();
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops, seems like you are not authorized!",
        text: "Something went wrong!, Please Contact Admin",
      });
    });
};

export const deletePostAction = async (id, gitPosts) => {
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

export const gitPostsAction = async (dispatch) => {
  const allPosts = await axios.get(`${process.env.REACT_APP_BACKEND}/post`, {
    headers: {
      Authorization: `Bearer ${cookies.load("token")}`,
    },
  });
  dispatch({ type: actionType.FETCH_POSTS, payload: allPosts.data });
};
