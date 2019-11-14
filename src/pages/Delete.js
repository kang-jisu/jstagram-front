import React, { Component } from 'react';
import axios from 'axios';

class Delete extends Component {
    componentDidMount=()=>{
        console.log(this.props.match.params);
        const obj = this.props.match.params.obj;
        const id = this.props.match.params.id;
        if(obj==="post"){
        axios.delete(`http://localhost:8080/api/post/${id}`)
        .then(res=>{
                alert("글 삭제되었습니다.");
                
                window.location.href = "/main";
        })
        .catch(error=>{
            console.log(error);
        });
        }

        else if(obj==="comment"){
        axios.delete(`http://localhost:8080/api/comments/${id}`)
        .then(res=>{
                console.log("댓글 삭제");
                console.log(res.data);
                window.location.href = `/detail/${res.data}`;
        })
        .catch(error=>{
            console.log(error);
        });
        }

            
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Delete;