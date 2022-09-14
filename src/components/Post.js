import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import AddCommentForm from "./Add-comment-form";
import AddPostForm from "./Add-post-form";

export default function Post() {
  const [post, setPost] = useState(null);

  const gitPosts = async () => {
    const allPosts = await axios.get(
      `${process.env.REACT_APP_DATABASE_URL}/post`
    );
    setPost(allPosts.data);
  };
  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_DATABASE_URL}/post/${id}`);
    gitPosts();
  };

  useEffect(() => {
    gitPosts();
  }, []);

  return (
    <div>
      <AddPostForm gitPosts={gitPosts} />
      <Row style={{ marginLeft: "7.5%" }} xs={1} sm={3} md={4} className="g-4">
        {/* <Row xs={1} sm={2} md={3} className="g-4"> */}
        {post &&
          post.map((pos, idx) => {
            return (
              <Col key={idx}>
                <Card style={{ width: "18rem" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{pos.title}</Card.Title>
                    <Card.Text>{pos.content}</Card.Text>
                    {/* <Card.Text> */}
                    {pos.Comments && (
                      <>
                        {pos.Comments.map((com, idxc) => {
                          return <p key={idxc}>{com.comment}</p>;
                        })}
                      </>
                    )}

                    {/* </Card.Text> */}
                    <AddCommentForm postID={pos.id} gitPosts={gitPosts} />
                    <Button
                      onClick={() => handleDelete(pos.id)}
                      variant="primary"
                    >
                      Delete Post
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

// <h1>{p.title}</h1>
// <p>{p.content}</p>
// <p>{p.Comments && p.Comments.map((com, idxc) => {
//     return (
//         <div key={idxc}>
//             <p>{com.comment}</p>
//             <p>{com.commentAuthor}</p>
//         </div>
//     )
// })}</p>
// <button onClick={() => handleDelete(p.id)}>Delete</button>
// <AddCommentForm postID={p.id} gitPosts={gitPosts} />
