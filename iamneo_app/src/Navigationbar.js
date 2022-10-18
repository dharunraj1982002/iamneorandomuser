import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
export class Navigationbar extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                    &nbsp;&nbsp;
                    <NavLink className="btn btn-light btn-outline-primary" to='/home'>
                                    Home
                    </NavLink>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <NavLink className="btn btn-light btn-outline-primary" to='/users'>
                                    User
                    </NavLink>
                            
                    </Nav>
               
                
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
