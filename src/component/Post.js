import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './PostList.css';
import {Card,CardHeader,CardBody,CardFooter,Row,CardImg,Button,Form,Col,Input} from 'reactstrap';
import img from '../image.JPG';
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import axios from 'axios';

class Post extends Component {
    insertForm = event =>{
        event.preventDefault();

        const postId= event.target.postId.value;
        const author = event.target.author.value;
        const comment = event.target.comment.value;
         const url= `http://localhost:8080/api/comments`;
         const formData = new FormData();
         formData.append('postId',postId);
         formData.append('author',author);
         formData.append('comment',comment);

        const config= {
                headers: {'Access-Control-Allow-Origin':'*'}
        }
        axios.post(url,formData,config)
        .then(res=>{
            console.log("댓글 입력 성공");
            console.log(res.data);
            window.location.href = `/detail/${res.data}`;
            
        })
        .catch(error=>{
            console.log(error);
        });
    }
    render() {
        
    const post = this.props.post;
    const comments = post.comments;
        return(
            <div>
                    {post!==undefined?(
                    <Card className="mb-5 post-detail-card" key={post.id}>
                    <Row className="no-gutters">
                        <Col md="8">
                        <CardImg src={img} className="card-img detail-image" alt={post.image}/>
                        </Col>
                        <Col md="4" className="card-detail-right">
                        <CardHeader className="bg-white">
                        <Link to={`/detail/${post.id}`} className="text-body font-weight-bold text-monospace detail-head">
    
                        {this.props.userList.filter(user=>user.id===post.author).map(u=>u.userId)}
                            </Link>
    
                   </CardHeader>
                   <CardBody className="border border-bottom border-gray commentbody">
    
                        <div className="overflow-auto comment-d pb-3 pr-3 pt-3" >
                        <span className="card-title font-weight-bold title-size">
                        {this.props.userList.filter(user=>user.id===post.author).map(u=>u.userId)}
                           </span> 
                            <span className="card-text text-size">
                                {post.content}
                            </span><br/>
                            {comments!==undefined && comments.length>0&&
                                comments.map((c)=>(
    
                                <p className="mb-0" key={c.id}>
                                    <span className="card-title font-weight-bold comment-title-size">
                        {this.props.userList.filter(user=>user.id===c.author).map(u=>u.userId)}</span>
                                    <span className="card-text comment-text-size">{c.comment}</span>
                                    <Button type="button" className="close" aria-label="Close">
                                        <Link to={`/delete/comment/${c.id}`} aria-hidden="true" className="closebtn">&times;</Link>
                                    </Button>
                                    <br/>
                                    <span className="mb-0 text-muted comment-date-size">{moment(c.regDate).format('MM월DD일')}</span>
                                    
                                </p>
                                ))
                            }
                        </div>
                        </CardBody>
                    <CardBody className="detail-icon-body">
                             <span>
                               <FontAwesomeIcon icon={faHeart} size="2x"/> 
                            </span>
                            <Link to={`/detail/${post.id}`} className="pl-2" >
                                <FontAwesomeIcon icon={faComment}  size="2x"/>
                            </Link>
                            <br/>
                            <span className="mb-0 text-muted small">{moment(post.regDate).format('MM월DD일')}</span>
                   </CardBody>
                   <Form onSubmit={this.insertForm}>
                   <CardFooter className="form-row w-auto m-0"> 
                   <Input type="text" name="postId" id="postId" value={post.id} className="d-none" readOnly/>
                        <Col>
                            <Input type="number" className="form-control" placeholder="작성자" name="author" id="comment_user_id"/>
                        </Col>
                        <Col xs="5">
                            <Input type="text" className="form-control" id="comment_text" name="comment"
                                       placeholder="댓글 달기"/>
                        </Col>
                        <Col>
                            <Button outline color="secondary" type="submit"  id="comment_insert">작성</Button>
                        </Col>
                   </CardFooter>
                   </Form>
                        </Col>
                    </Row>
    
                 
                </Card>
                        ):(
                            <span>
                                LOADING...
                            </span>
                    )}
            </div>
        );
    }
}

export default Post;