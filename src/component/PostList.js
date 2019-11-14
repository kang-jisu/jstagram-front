import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './PostList.css';
import {Card,CardHeader,CardBody,CardFooter,CardImg,Button,Form,Col,Input} from 'reactstrap';
import img from '../image.JPG';
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import axios from 'axios';

class PostList extends Component {

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
            window.location.href = "/main";
            
        })
        .catch(error=>{
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                {this.props.list.map( (post) => (
                <Card className="mb-5 post-card" key={post.id}>
                   <CardHeader className="bg-white">
                        <Link to={{
                            pathname:`./detail/${post.id}`,
                            // state:{
                            //     postid:post.id,
                            //     list:props.list
                            // }
                            }} className="text-body font-weight-bold text-monospace" >
                            {
                                this.props.userList.filter(user=>user.id===post.author).map(u=>u.userId)}
                        </Link>
                        <Button className="close" aria-label="Close">
                            <Link to={`/delete/post/${post.id}`} aria-hidden="true" >&times;</Link>
                        </Button>
                   </CardHeader>
                   <CardImg src={`/images/${post.image}`} className="card-img-top" alt={post.image}/>
                   <CardBody className="pt-2 pb-1 border-bottom border-gray">
                        <section>
                            <span>
                               <FontAwesomeIcon icon={faHeart} size="2x"/> 
                            </span>
                            <Link to={`./detail/${post.id}`} className="pl-2" >
                                <FontAwesomeIcon icon={faComment}  size="2x"/>
                            </Link>
                        </section> 
    
                           <span className="card-title font-weight-bold title-size">
                            {this.props.userList.filter(user=>user.id===post.author).map(u=>u.userId)}
                           </span> 
                            <span className="card-text text-size">
                                {post.content}
                            </span><br/>
    
                        <div className="overflow-auto comment">
                            {post.comments.length>0&&
                                post.comments.map((c)=>(
                                <p className="mb-0" key={c.id}>
                                    <span className="card-title font-weight-bold comment-title-size">
                            {
                                this.props.userList.filter(user=>user.id===c.author).map(u=>u.userId)}</span>
                                    <span className="card-text comment-text-size">{c.comment}</span>
                                </p>
                                ))
                            }
                        </div>
                        <Link to={`./detail/${post.id}`} className="small mb-0 text-muted">{moment(post.regDate).format('MM월DD일')}</Link>
                   </CardBody>
                   <Form  onSubmit={this.insertForm}>
                   <CardFooter className="form-row w-auto m-0"> 
                        <Input type="text" name="postId" id="postId" value={post.id} className="d-none" readOnly/>
                        <Col>
                            <Input type="number" className="form-control" placeholder="작성자" name="author" id="comment_user_id" />
                        </Col>
                        <Col xs="9">
                            <Input type="text" className="form-control" id="comment_text" name="comment" 
                                       placeholder="댓글 달기"/>
                        </Col>
                        <Col>
                            <Button outline color="secondary" type="submit"  id="comment_insert">작성</Button>
                        </Col>
                   </CardFooter>
                   </Form>

                   
                </Card> 
                ))
                }
            </div>
        );
    }
}

export default PostList;