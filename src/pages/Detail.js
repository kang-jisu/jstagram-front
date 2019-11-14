import React,{Component} from 'react';
import axios from 'axios';
import Post from '../component/Post';

class Detail extends Component {
    constructor(props){
    super(props);
    this.state={
        post:[],
        userList:[],
    };
}
  
componentDidMount=()=>{
    axios.get(`http://localhost:8080/api/post/${this.props.match.params.postid}`)
        .then(res=>{
            this.setState({
                post:res.data
            });
        })
        .catch(error=>{
            console.log(error);
                return(
                    <div>
                        {error}
                    </div>
                )
            }
        );
        axios.get(`http://localhost:8080/api/user`)
            .then(res=>{
                this.setState({
                    userList:res.data
                });
            })
            .catch(error=>{
                console.log(error);
            });
            
        
}

    render() {
        return (
                    <Post post={this.state.post} userList={this.state.userList} />
        );
    }
}

export default Detail;