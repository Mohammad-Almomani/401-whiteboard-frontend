import * as React from "react";

import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AddPostForm from "./Add-post-form";
import ModalFather from "./modalFather";
import { Button } from "@mui/material";
import { useLoginContext } from "../Context/Login_Context";

export default function Posts() {

  const {handleSignOut, gitPosts, post} = useLoginContext();

  useEffect(() => {
    gitPosts();
  }, []);

  return (
    <>
      <AddPostForm />

      <Row style={{ marginLeft: "7.5%" }} xs={1} sm={2} md={3} className="g-4">
        {post &&
          post.map((pos, idx) => {
            return (
              <Col key={idx}>
                <ModalFather
                  username={pos.username}
                  content={pos.content}
                  id={pos.id}
                  usersComments={pos.usersComments}
                  title={pos.title}
                  imgURL={pos.imgURL}
                />
              </Col>
            );
          })}
      </Row>
      <a style={{ display: "block", marginTop: "2%" }}>
        You are done here? don't forget to
        {<Button onClick={handleSignOut}>Sign Out</Button>}
      </a>
    </>
  );
}
