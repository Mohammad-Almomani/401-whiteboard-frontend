import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import cookies from "react-cookies";
import Swal from "sweetalert2";

export default function TestModal(props) {
 
  const id = props.id;
  const handleClose = () =>{ 
    
    props.handleClose()
    // console.log('show',show);
}

const editPost = async (e) => {
  console.log('id',id);
  e.preventDefault();
  const post = {
    title: e.target.title.value || props.title,
    content: e.target.content.value || props.content,
    imgURL: e.target.imgURL.value || props.imgURL,
    username: cookies.load("username"),
    userID: cookies.load("userID"),
  };

  await axios.put(`${process.env.REACT_APP_BACKEND}/post/${id}`, post, {
    headers: {
      Authorization: `Bearer ${cookies.load("token")}`,
    },
  }).then(res => {
    Swal.fire(
      "Post Updated Successfully!",
      "",
      "success"
    );
    e.target.reset();
    props.gitPosts();
  }).catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops, seems like you are not authorized!',
      text: 'Something went wrong!, Please Contact Admin'
        })
   })

};


  return (
    <>
    <Modal style={{marginTop:'15%'}} show={props.show} onHide={ props.handleClose}> 
      <Modal.Header closeButton>

      </Modal.Header >
      {/* <Modal.Body></Modal.Body>
      <Modal.Body>{props.id}</Modal.Body>
      <Modal.Body>{props.content}</Modal.Body> */}

      <Form onSubmit={editPost} style={{ margin: "3% 30%" }}>
        <h3>Edit Post</h3>
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="New Title (Optional)"
          type="text"
          name="title"
          rows={3}
          placeholder={`${props.title}`}
        />

        <TextField
          margin="normal"
          fullWidth
          name="content"
          label="New Content (Optional)"
          type="text"
          id="content"
          rows={3}
          placeholder={props.content}
        />

<TextField
          margin="normal"
          fullWidth
          name="imgURL"
          label="New Image URL (Optional)"
          type="text"
          id="imgURL"
          rows={3}
          placeholder={props.imgURL}
        />


        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Form>

      <Modal.Footer>
        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={()=>handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}


