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
import TestModal from "./testModal";

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

export default function ModalFather(props) {

    let [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
        console.log("show", show);
      };
    
    //   const handleClose = () => {
    //     setShow(false);
    //     console.log("show", show);
    //   };

      const handleDelete = async (id) => {
  
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
            await axios.delete(`${process.env.REACT_APP_BACKEND}/post/${id}`);
            props.gitPosts();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      };

  return (
<div>
<Card sx={{ maxWidth: 400 }}>

<CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="props.">
      {props.title.charAt(0).toUpperCase() || "P"}
    </Avatar>
  }
  action={
    <>
    {console.log('from actions')}
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
          <Dropdown.Item onClick={() => handleDelete(props.id)}>
            Delete Post
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>handleShow()}>
            Edit    
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
              <TestModal
  title={props.title}
  content={props.content}
  id={props.id}
  show={show}
  handleClose={handleShow}
    gitPosts={props.gitPosts}
/>                 
    </>
  }
  title={props.title}
/>
By {props.username}
<CardMedia
  component="img"
  height="194"
  image={image}
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    {props.content}
  </Typography>
</CardContent>
<CardActions disableSpacing></CardActions>
<Collapse in={true} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography style={{ fontWeight: "bolder" }} paragraph>
      Comments:
    </Typography>
    {props.usersComments && (
      <Typography  paragraph style={{textAlign:'left'}}>
        {props.usersComments.map((com) => (
          <ul style={{ display: "block" }} key={com.id}>
            {com.commentAuthor.toUpperCase()}: {com.comment}
          </ul>
        ))}
      </Typography>
    )}

    <AddCommentForm postID={props.id} gitPosts={props.gitPosts} />
  </CardContent>
</Collapse>
</Card>
</div>

  )
}