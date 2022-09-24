import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import cookies from "react-cookies";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function EditPostForm(props) {
  const id = useParams().id;
  console.log(id);
  const editPost = async (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value,
      content: e.target.content.value,
      username: cookies.load("username"),
      userID: cookies.load("userID"),
    };

    await axios.put(`${process.env.REACT_APP_BACKEND}/post/${id}`, post);
    Swal.fire(
      "Post Updated Successfully!",
      "",
      "success"
    );
  };

  return (
    <div>
      <Form onSubmit={editPost} style={{ margin: "3% 30%" }}>
        <h3>Edit Post</h3>
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Example: Motivational Quote"
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

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
