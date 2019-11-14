
import React from 'react';
import {Container,Navbar, Form, Col, Row,Input,Button} from 'reactstrap'; 
import {Link} from 'react-router-dom';
import './Header.css';
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faEdit, faHeart, faUser} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Header = (props) => (
            <div className = "header" >
            <Navbar expand="lg" className={props.class}>
               <Container >
                   <Row className="col-12">
                       <Col xs="4"  >
                         <FontAwesomeIcon icon={faInstagram} size="2x" className="m-2 mt-3 mb-1"/>
                         <Link to="/main" className="hlink">Jstagram</Link>
                       </Col>
                       <Col xs="4" className="form-inline " >
                           <Form>
                               <Input className="form-control m-2" type="search" placeholder="Search" aria-label="Search"/>
                                <Button outline color="success" className="m-2" type="submit">Search</Button> 
                            </Form>
                       </Col>
                       <Col xs="4"  className="text-right">
                       <Link to="/insert">
                         <FontAwesomeIcon icon={faEdit} size="2x" className="m-2 mt-3 mb-1"/>
                        </Link>
                         <FontAwesomeIcon icon={faHeart} size="2x" className="m-2 mt-3 mb-1"/>
                         <FontAwesomeIcon icon={faUser} size="2x" className="m-2 mt-3 mb-1"/>
                       </Col>
                   </Row>
               </Container>
           </Navbar>
        </div>
)

export default Header;


