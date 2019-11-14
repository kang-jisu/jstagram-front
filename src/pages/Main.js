import React, { Component } from 'react';
import axios from 'axios';
import {PostList,Post} from '../component';
import {Detail} from '../pages';

import {Route, Link} from 'react-router-dom';
class Main extends Component {
    constructor(props){
        super(props);

        this.state={
            postList:[],
            userList:[],
        };
    }

      
    componentDidMount=()=>{
        axios.get(`http://localhost:8080/api/posts`)
            .then(res=>{
                this.setState({
                    postList:res.data
                });
            })
            .catch(error=>{
                console.log(error);
            });
        
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
            <div >  
                    {this.state.postList.length>0?(
                    
                    <PostList list={this.state.postList} userList={this.state.userList}/>
                    ):(
                        <span>
                            LOADING...
                        </span>
                    )}
             </div>
        );
    }
}

export default Main;        