
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import {Detail,Insert, Main,Delete} from './pages';
import {Post} from './component';
import {Header} from './component';
import {Container} from 'reactstrap'; 
import ScrollToTop from './ScrollToTop';
import axios from 'axios';

import './App.css'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      class:"fixed-top bg-white border-bottom border-gray header-top",
    };
  }

  componentDidMount() {
   window.addEventListener('scroll', this.handleScroll,true);
 }

 componentWillUnmount() {
   window.removeEventListener('scroll', this.handleScroll);
 }

  handleScroll = () => {
    if(window.scrollY>50){
      this.setState({
        class:"fixed-top bg-white border-bottom border-gray header-shrink"
      });
    }
    else {
      this.setState({
        class:"fixed-top bg-white border-bottom border-gray header-top"
      });
    }


   }


  render() {
    return (
    <ScrollToTop>
        <div className= "App-body bg-light" >
          <Header class={this.state.class}/>
          <Container className="cont">
            <div className="row justify-content-center">
            <div>
          <Route exact path="/" component={Main} userlist={this.state.userlist}/>
          <Route path="/main" component={Main} userlist={this.state.userlist}/>
          <Route exact path="/detail/:postid" component={Detail}/>
          <Route path="/insert" component={Insert}/>
          <Route exact path="/delete/:obj/:id" component={Delete}/>
          <Route path="/comment" component={Comment}/>
          
          </div>
          </div>
          </Container>

        </div>
      </ScrollToTop>
    );
  }
}

export default App;