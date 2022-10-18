import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import './index.css';
import{Button,ButtonToolbar}from 'react-bootstrap';
import {Addusermodal} from './Addusermodal';
import {Editusermodal} from './Editusermodal';



export class Userdetails extends Component{
    constructor(props){
        super(props);
        this.state={dets:[], addModalShow:false, editModalShow:false,
        UseridFilter:"",NameFilter:"",WithoutFilter:[]
        }
    }


    FilterFuncID(){
        var UseridFilter = this.state.UseridFilter;
        var FilteredData = this.state.WithoutFilter.filter(
            function(e){
                return e.UserID.toString().toLowerCase().includes(
                    UseridFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({dets:FilteredData});
    }
    FilterFuncName(){
        var NameFilter = this.state.NameFilter;
        var FilteredData = this.state.WithoutFilter.filter(
            function(e){
                return e.Name.toString().toLowerCase().includes(
                    NameFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({dets:FilteredData});
    }


    FilterFuncPhone(){
        var PhoneNOFilter=this.state.PhoneNOFilter;
        var FilteredData = this.state.WithoutFilter.filter(
            function(e){
                return e.PhoneNO.toString().toLowerCase().includes(
                    PhoneNOFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({dets:FilteredData});
    }


    FilterFuncLoc(){
        var LocationFilter=this.state.LocationFilter;
        var FilteredData = this.state.WithoutFilter.filter(
            function(e){
                return e.Location.toString().toLowerCase().includes(
                    LocationFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({dets:FilteredData});
    }


    sortResult(property, bol){
        var sorted_data = this.state.WithoutFilter.sort(function(a,b){
            if(bol){
                return (a[property]>b[property])?1:((a[property]<b[property])?-1:0);
            }
            else{
                return (b[property]>a[property])?1:((b[property]<a[property])?-1:0);
            }
        });
        this.setState({dets:sorted_data});
    }


    changeUserIDFilter=(e)=>{
        this.state.UseridFilter=e.target.value;
        this.FilterFuncID();
    }
    changeNameFilter=(e)=>{
        this.state.NameFilter=e.target.value;
        this.FilterFuncName();
    }
    changePhoneNOFilter=(e)=>{
        this.state.PhoneNOFilter=e.target.value;
        this.FilterFuncPhone();
    }
    changeLocationFilter=(e)=>{
        this.state.LocationFilter=e.target.value;
        this.FilterFuncLoc();
    }


    refreshList(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json())
        .then(data=>{
            this.setState({WithoutFilter:data,/*dets:data*/});
        });

    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }

    deleteUser(RandomID){
        if(window.confirm('Confirm deletion?')){
            fetch(process.env.REACT_APP_API+'/delete/'+RandomID,{
                method:'DELETE',
                header:{
                    'Accept':'application/json', 
                    'Content-type':'application/json'}
            })
        }
    } 


    
    render(){
        const {dets, uid, uname, email,dob, phno, locn, addr, stat, imgname}=this.state;
        let addModalClose = ()=>this.setState({addModalShow:false});
        let editModalClose = ()=>this.setState({editModalShow:false});
        return(
            <div>
                
                <ButtonToolbar>
                {/*<input className="form-control m-2"onChange={this.changeUserIDFilter} placeholder="Filter by UserID"/>
                <input className="form-control m-2"onChange={this.changeNameFilter} placeholder="Filter by Name"/>
                <input className="form-control m-2"onChange={this.changePhoneNOFilter} placeholder="Filter by Phonenum"/>
                <input className="form-control m-2"onChange={this.changeLocationFilter} placeholder="Filter by Location"/>
              
                
                */}

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('Name',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
                ascending sort
            </button>
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('Name',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
                descending sort
            </button>
            </ButtonToolbar>
            <Table>
                <tr>
                    <th><input className="form-control m-2"onChange={this.changeUserIDFilter} placeholder="Filter by UserID"/></th>
                    <th><input className="form-control m-2"onChange={this.changeNameFilter} placeholder="Filter by Name"/></th>
                    <th><input className="form-control m-2"onChange={this.changePhoneNOFilter} placeholder="Filter by Phonenum"/></th>
                    <th><input className="form-control m-2"onChange={this.changeLocationFilter} placeholder="Filter by Location"/></th>
                </tr>
            </Table>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>UserID</th>
                        <th>Name</th>
                        <th>EmailID</th>
                        <th>DOB</th>
                        <th>PhoneNO</th>
                        <th>Location</th>
                        <th>Address</th>
                        <th>UserStatus</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody bgcolor='#4dffff'>
                        {dets.map(det=>
                            <tr key = {det.RandomID}>
                                <td>{det.UserID}</td>
                                <td>{det.Name}</td>
                                <td>{det.EmailID}</td>
                                <td>{det.DOB}</td>
                                <td>{det.PhoneNO}</td>
                                <td>{det.Location}</td>
                                <td>{det.Address}</td>
                                <td>{det.UserStatus}</td>
                                {/*<td>Edit/Delete</td>*/}
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant = "info" size='sm'
                                        onClick={()=>this.setState({editModalShow:true,
                                            uid:det.UserID, uname:det.Name,email:det.EmailID, dob:det.DOB, phno:det.PhoneNO, locn:det.Location, 
                                            addr:det.Address, stat:det.UserStatus, imgname:det.ImageName })}>
                                                Edit
                                        </Button>
                                           <Editusermodal show = {this.state.editModalShow}
                                           onHide = {editModalClose}
                                           uid = {uid}
                                           uname = {uname}
                                           email = {email}
                                           dob = {dob}
                                           phno = {phno}
                                           locn = {locn}
                                           addr = {addr}
                                           stat = {stat}
                                           imgname = {imgname}/>
                                        <Button className="mr-2" variant="danger" size='sm'
                                        onClick={()=>this.deleteUser(det.RandomID)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>        
                                        </td>
                            </tr>)}
                    </tbody>
                </Table>
               <ButtonToolbar>
                    <Button variant='primary' size='sm'
                    onClick={()=> this.setState({addModalShow:true})}>
                        Add User
                    </Button>
                    <Addusermodal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}