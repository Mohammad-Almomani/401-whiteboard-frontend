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
import {  useState } from "react";
import AddCommentForm from "./Add-comment-form";
import { Col, Dropdown, Row } from "react-bootstrap";
import image from "./assets/img.jpg";
import TestModal from "./EditModal";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";


export default function ModalFather(props) {
  let [show, setShow] = useState(false);
  
  const { capabilities, user, canDo } = useLoginContext();
  const { handleDelete } = usePostContext();

  const handleShow = () => {
    setShow(!show);
  };

  //   const handleClose = () => {
  //     setShow(false);
  //     console.log("show", show);
  //   };

  return (
    <div>
      <Card sx={{ maxWidth: 380 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="props.">
              {props.title.charAt(0).toUpperCase() || "P"}
            </Avatar>
          }
          action={
            <>
            {/* {console.log("user", user, "capabilities", capabilities)} */}
              {(canDo(user.username, props.username)) && (
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

                  <Dropdown.Menu style={{ backgroundColor: "lightblue" }}>
                    <Dropdown.Item onClick={() => handleDelete(props.id)}>
                      Delete Post
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShow()}>
                      Edit
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <TestModal
                title={props.title}
                content={props.content}
                id={props.id}
                show={show}
                handleClose={handleShow}
                imgURL={props.imgURL}
              />
            </>
          }
          title={props.title}
        />
        By {props.username}
        <CardMedia
          component="img"
          height="194"
          image={props.imgURL ? props.imgURL : image}
          alt={`image of ${props.title}`}
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
              <Typography paragraph style={{ textAlign: "left" }}>
                {props.usersComments.map((com) => (
                  <a style={{ display: "block" }} key={com.id}>
                    {com.commentAuthor.toUpperCase()}: {com.comment}
                  </a>
                ))}
              </Typography>
            )}

            <AddCommentForm postID={props.id} gitPosts={props.gitPosts} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
