import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCommentForm from "./Add-comment-form";
import { Col, Dropdown, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import image from "./assets/img.jpg";
import AddPostForm from "./Add-post-form";
import cookies from "react-cookies";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RecipeReviewCard(props) {
  const [expanded, ] = useState(true);

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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`${process.env.REACT_APP_BACKEND}/post/${id}`);
        gitPosts();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  const handleSignOut = () => {
    cookies.remove("token");
    cookies.remove("userID");
    cookies.remove("username");
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
                <Card sx={{ maxWidth: 400 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
                        {pos.title.charAt(0).toUpperCase() || "P"}
                      </Avatar>
                    }
                    action={
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            style={{
                              backgroundColor: "white",
                              borderColor: "white",
                              padding: "0px",
                            }}
                          >
                            <MoreVertIcon
                              style={{
                                backgroundColor: "gray",
                                borderRadius: "20px",
                              }}
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            style={{ backgroundColor: "lightblue" }} 
                          >
                            <Dropdown.Item onClick={() => handleDelete(pos.id)}>
                              Delete Post
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to={`/edit/${pos.id}`}>
                            Edit Post 
                            </Dropdown.Item>  
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    }
                    title={pos.title}
                    />
                    By {pos.username}
                  <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {pos.content}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing></CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography style={{ fontWeight: "bolder" }} paragraph>
                        Comments:
                      </Typography>
                      {pos.usersComments && (
                        <Typography key={idx} paragraph>
                          {pos.usersComments.map((com) => (
                            <a style={{ display: "block" }} key={com.id}>
                             {com.commentAuthor.toUpperCase()}: {com.comment}
                            </a>
                          ))}
                        </Typography>
                      )}

                      <AddCommentForm postID={pos.id} gitPosts={gitPosts} />
                    </CardContent>
                  </Collapse>
                </Card>
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
