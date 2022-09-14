import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default function AddCommentForm(props) {
  const addComment = async (e) => {
    e.preventDefault();
    const comment = {
      comment: e.target.content.value,
      // commentAuthor: e.target.commentAuthor.value,
      postID: props.postID,
    };

    await axios.post(`${process.env.REACT_APP_BACKEND}/comment`, comment);
    props.gitPosts();
  };

  return (
    <div>
      <Form onSubmit={addComment} style={{ margin: "10px 50px" }}>
        {/* <Form.Group className="mb-3">
        <Form.Label>you Name</Form.Label>
        <Form.Control id="commentAuthor" type="text" placeholder="Optional" />   
     
    </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Type here</Form.Label>
          <Form.Control type="text" id="content" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {" "}
          Add comment{" "}
        </Button>
      </Form>
    </div>
  );
}
