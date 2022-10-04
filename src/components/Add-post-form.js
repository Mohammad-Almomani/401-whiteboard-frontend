import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import cookies from "react-cookies";
import Swal from "sweetalert2";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";


export default function AddPostForm() {
  const {  user } = useLoginContext();
  const { gitPosts } = usePostContext();

  const addPost = async (e) => {
    e.preventDefault();
    console.log(e.target.imgURL.value);
    const post = {
      title: e.target.title.value,
      content: e.target.content.value,
      imgURL: e.target.imgURL.value,
      username: user.username,
      userID: user.id,
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND}/post`, post, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((res) => {
        console.log(res);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Posted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        gitPosts();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops, seems like you are not authorized!",
          text: "Something went wrong!, Please Contact Admin",
        });
      });
  };

  return (
    <div>
      <Form onSubmit={addPost} style={{ margin: "3% 30%" }}>
        <h3>Create Post</h3>

        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          type="text"
          name="title"
          rows={3}
          required
        />

        <TextField
          margin="normal"
          fullWidth
          name="content"
          label="Type here"
          type="text"
          id="content"
          rows={3}
        />

        <TextField
          margin="normal"
          fullWidth
          name="imgURL"
          label="Enter Image URL here (Optional)"
          type="url"
          id="imgURL"
          rows={3}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
