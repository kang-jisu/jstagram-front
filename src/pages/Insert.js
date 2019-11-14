import React, { Component } from 'react';
import axios from 'axios';

class Insert extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      }
    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
          })
    }
    insertForm = event =>{
        event.preventDefault();
        const author = event.target.author.value;
        const content = event.target.content.value;
        
        console.log(this.state.selectedFile);
        const url= `http://localhost:8080/api/post`;
        const formData = new FormData();
        formData.append('file',this.state.selectedFile);
        formData.append('author',author);
        formData.append('content',content);

        axios.post(url,formData)
        .then(res=>{
            console.log("입력 성공");
            
             window.location.href = "/";
            
        })
        .catch(error=>{
            console.log(error);
        });

    }
    render() {
        return (
            <div>
                글쓰기
                <form onSubmit={this.insertForm} >
                    <table>
                        <tbody>
                            <tr>
                            <th>사진</th>
                            <td> <input type="file"  name="image" id="image" onChange={this.onChangeHandler}/></td>
                            </tr>
                        <tr>
                            <th>글쓴이</th>
                            <td><input type="number" name="author" id="author" /></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><input type="text" name="content" id="content"/></td>
                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><button type="submit">작성</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </form>
            </div>
        );
    }
}

export default Insert;