import React from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import cookies from "react-cookies";

export default function addPostForm(props) {
  const addPost = async (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value,
      content: e.target.content.value,
      username: cookies.load("username"),
      userID: cookies.load("userID"),
    };

    await axios.post(`${process.env.REACT_APP_BACKEND}/post`, post);
    e.target.reset();
    props.gitPosts();
  };

  return (
    <div>
      <Form onSubmit={addPost} style={{ margin: "3% 30%" }}>
        <h3>Create Post</h3>

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
