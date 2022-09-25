import * as React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import image from "./assets/img.jpg";
import AddPostForm from "./Add-post-form";
import cookies from "react-cookies";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import ModalFather from "./modalFather";
import { Button } from "@mui/material";

export default function Newposts(props) {
  const [post, setPost] = useState(null);

  let [show, setShow] = useState(false);

  // const handleClose = () =>{
  //   setShow(false)}
  //   console.log('show',show);
  //   ;

  const gitPosts = async () => {
    const allPosts = await axios.get(`${process.env.REACT_APP_BACKEND}/post`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });

    setPost(allPosts.data);
  };

  const handleSignOut = () => {
    cookies.remove("token");
    cookies.remove("userID");
    cookies.remove("username");
    cookies.remove("role");
    props.checkIfAuthorized(false);
  };

  useEffect(() => {
    gitPosts();
  }, []);

  return (
    <>
      <AddPostForm gitPosts={gitPosts} />

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
                  gitPosts={gitPosts}
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
