import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Modal,Navbar,Nav} from 'react-bootstrap';
export class Navigationbar extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to='/home'>
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2  bg-dark text-white" to='/users'>
                            Users
                        </NavLink>
                            
                    </Nav>
               
                
                </Navbar.Collapse>
            </Navbar>
        )
    }
}