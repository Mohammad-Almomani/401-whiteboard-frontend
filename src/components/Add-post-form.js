import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default function addPostForm(props) {
  const addPost = async (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value,
      content: e.target.content.value,
    };

    await axios.post(`${process.env.REACT_APP_BACKEND}/post`, post);
    props.gitPosts();
  };

  return (
    <div>
      <Form onSubmit={addPost} style={{ margin: "10px 50px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            placeholder="Example: Motivational Quote"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type here</Form.Label>
          <Form.Control type="text" id="content" as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {" "}
          Submit{" "}
        </Button>
      </Form>
    </div>
  );
}
