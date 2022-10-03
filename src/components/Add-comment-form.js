import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import cookies from "react-cookies";
import { useLoginContext } from "../Context/Login_Context";

export default function AddCommentForm(props) {
  const { gitPosts } = useLoginContext();
  const addComment = async (e) => {
    e.preventDefault();
    const comment = {
      comment: e.target.content.value,
      postID: props.postID,
      userID: cookies.load("userID"),
      commentAuthor: cookies.load("username"),
    };
    try {
      const qq = await axios.post(
        `${process.env.REACT_APP_BACKEND}/comment`,
        comment
      );
      console.log(qq.data);
      e.target.reset();
      gitPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={addComment} style={{ margin: "10px 50px" }}>
        {/* <Form.Group className="mb-3">
        <Form.Label>you Name</Form.Label>
        <Form.Control id="commentAuthor" type="text" placeholder="Optional" />   
     
    </Form.Group> */}
        <Form.Group className="mb-3">
          {/* <Form.Label>Type here</Form.Label> */}
          <TextField
            margin="normal"
            fullWidth
            id="content"
            label="add comment"
            name="email"
            type="text"
            autoFocus
          />
        </Form.Group>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {" "}
          Add comment{" "}
        </Button>
      </Form>
    </div>
  );
}
