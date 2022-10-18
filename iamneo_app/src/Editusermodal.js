import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap';


export class Editusermodal extends Component{
    constructor(props){
        super(props);
        this.state = {dets:[]};
        this.handleSubmit=this.handleSubmit.bind(this); 
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    

    
    
    componentDidMount(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json)
        .then(data=>{
            this.setState({deps:data});
        });
    }
    handleSubmit(event)
    {
        event.preventDefault();
        fetch(process.env.REACT_APP_API,{
            method: "PUT",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                RandomID: null,
                UserID:event.target.UserID.value,
                Name:event.target.Name.value,
                EmailID:event.target.EmailID.value,
                DOB:event.target.DOB.value,
                PhoneNO:event.target.PhoneNO.value,
                Location:event.target.Location.value,
                Address:event.target.Address.value,
                UserStatus:event.target.UserStatus.value,
                ImageName:event.target.ImageName.value,

            })
        })
        .then(res=>res.json())
            .then((result)=>{
                alert(result);
            },
            (error)=>{
                alert('Failed'); 
            })

    }
   /* imgname=this.props.imgname;
imgsrc = process.env.REACT_APP_PHOTOPATH+this.props.imgname;*/
    handleFileSelected(event){
        event.preventDefault();
        this.imgname=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "UserImage",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API+'/userimages',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imgsrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
    }
    imgsrc = process.env.REACT_APP_PHOTOPATH+this.imgname;
    render(){
        return(
            <div className="app">
<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered>

<Modal.Header closebutton>
    <Modal.Title id="contained-modal-title-vcenter">
            Edit User Details
    </Modal.Title>
</Modal.Header>
<Modal.Body>
    <Row sm={4}>
        <Col sm={7}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="UserID"> 
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" name="UserID" required
                    //disabled
                    defaultValue={this.props.uid}
                    placeholder="Enter User ID"/>
                </Form.Group>
                <Form.Group controlId="Name"> 
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="Name" required
                    defaultValue={this.props.uname}
                    placeholder="Enter name"/>
                </Form.Group>
                <Form.Group controlId="EmailID"> 
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control type="text" name="EmailID" required
                    defaultValue={this.props.email}
                    placeholder="Enter Email-ID"/>
                </Form.Group>
                <Form.Group controlId="DOB"> 
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="DOB" required
                    defaultValue={this.props.dob}
                    placeholder="Enter DOB"/>
            </Form.Group>
            <Form.Group controlId="PhoneNO"> 
                    <Form.Label>Phone num</Form.Label>
                    <Form.Control type="text" name="PhoneNo" required
                    defaultValue={this.props.phno}
                    placeholder="Enter Phonenum"/>
                </Form.Group>
                <Form.Group controlId="Location"> 
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="Location" required
                    defaultValue={this.props.locn}
                    placeholder="Enter Location"/>
                </Form.Group>
                <Form.Group controlId="Address"> 
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="Address" required
                    defaultValue={this.props.addr}
                    placeholder="Enter Address"/>
                </Form.Group>
                <Form.Group controlId="UserStatus"> 
                    <Form.Label>User status</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select User Status</option>
                        <option value="exam not started">exam not started</option>
                        <option value="exam started">exam started</option>
                    <   option value="exam completed">exam completed</option>
                        defaultValue={this.props.stat}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="ImageName"> 
                    <Form.Label>Image file name</Form.Label>
                    <Form.Control type="text" name="ImageName" required
                    defaultValue={this.props.imgname}
                    placeholder="Enter image name"/>
                </Form.Group>
                <Col sm={6}>
                    <Image width="200px" height="200px" 
                    src={process.env.REACT_APP_PHOTOPATH+this.props.imgname}/>
                    <input onChange={this.handleFileSelected} type="File"/>
                </Col>

                <Form.Group>
                    <Button variant="primary" type="submit">
                        Update User
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    </Row>
        </Modal.Body>
<Modal.Footer>
    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
</Modal>


            </div>

        )
    }
}
