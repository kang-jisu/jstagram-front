import React, { Component } from 'react';
import {post,get} from 'axios';
import axios from 'axios';
import {Link } from 'react-router-dom';

class Insert extends Component {
    state={
        userId:'',
        name:'',
        email:'',
        text:'',
        phone:'',
        sex:'',
        userList:[],
    }

    componentDidMount=()=>{

        get(`http://localhost:8080/api/user`)
            .then(res=>{
                this.setState({
                    userList:res.data
                });
            })
            .catch(error=>{
                console.log(error);
            });
            
    }
    handleChange = event =>{
        this.setState({
            [event.target.name]:event.target.value,
        })
    }

    deleteForm = (id)=>{
        axios.delete(`http://localhost:8080/api/user/${id}`)
        .then(res=>{
                const newUL = this.state.userList.slice();
                newUL.splice(id,1);
                this.setState({
                    userList : newUL,
                });
                alert("삭제되었습니다.");
                window.location.href = "./insert";
        })
        .catch(error=>{
            console.log(error);
        });

    }
    insertForm = event =>{
        event.preventDefault();

        const url= `http://localhost:8080/api/user`;
        const formData = new FormData();
        formData.append('userId',this.state.userId);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('text',this.state.text);
        formData.append('phone',this.state.phone);
        formData.append('sex',this.state.sex);

        const config= {
                headers: {'Access-Control-Allow-Origin':'*'}
        }
        post(url,formData,config)
        .then(res=>{
            console.log("입력 성공");
            
            window.location.href = "./insert";
            
        })
        .catch(error=>{
            console.log(error);
        });
    }
    render() {
        return (
            <div>
            <br/><br/><br/><br/>
                Insert Form
                <form onSubmit={this.insertForm}>
                    <div>
                        <label htmlFor="userId">userId</label>
                        <input 
                            id="userId"
                            name="userId"
                            placeholder="작성자"
                            value={this.state.userId}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="name">name</label>
                        <input 
                            id="name"
                            name="name"
                            placeholder="이름"
                            value={this.state.name}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="이메일"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="text">text</label>
                        <input 
                            id="text"
                            name="text"
                            placeholder="text"
                            value={this.state.text}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="phone">phone</label>
                        <input 
                            id="phone"
                            name="phone"
                            placeholder="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="sex">성별</label>
                        <input 
                            id="sex"
                            name="sex"
                            placeholder="성별"
                            value={this.state.sex}
                            onChange={this.handleChange}/>
                    </div>
                     <button type="submit" >작성</button>
                </form>


                <hr/><hr/>
                userList
                {this.state.userList.map( (u) =>{
                    return (
                        <ul key={u.id}>
                            <li>
                                {u.userId}|{u.name}|{u.email}|{u.phone}|<span ><button type="button" onClick={() => this.deleteForm(u.id)}  >x</button></span>
                            </li>
                        </ul>
                    )
                } )}
            </div>
        );
    }
}

export default Insert;