import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap';

export class Addusermodal extends Component{
    constructor(props){
        super(props);
        this.state = {dets:[]};
        this.handleSubmit=this.handleSubmit.bind(this); 
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }
    imgname = "anonymous.png"
    imgsrc = process.env.REACT_APP_PHOTOPATH+'/'+this.imgname;


    actions = [
        { label: "exam not started", value: 1 },
        { label: "exam started", value: 2 },
        { label: "exam completed", value: 3 }
      ];



    componentDidMount(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }
    handleSubmit(event)
    {
        event.preventDefault();
        fetch(process.env.REACT_APP_API,{
            method: 'POST',
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
                ImageName:this.imgname

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
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return(
            <div className="container">
<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered>

<Modal.Header closebutton>
    <Modal.Title id="contained-modal-title-vcenter">
            Add User
    </Modal.Title>
</Modal.Header>
<Modal.Body>
    <Row sm={4}>
        <Col sm={7}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="UserID"> 
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" name="UserID" required
                    placeholder="Enter User ID"/>
                </Form.Group>
                <Form.Group controlId="Name"> 
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="Name" required
                    placeholder="Enter name"/>
                </Form.Group>
                <Form.Group controlId="EmailID"> 
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control type="text" name="EmailID" required
                    placeholder="Enter Email-ID"/>
                </Form.Group>
                <Form.Group controlId="DOB"> 
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type='date' name="DOB" required/>
                   
            </Form.Group>
            <Form.Group controlId="PhoneNO"> 
                    <Form.Label>Phone num</Form.Label>
                    <Form.Control type="text" name="PhoneNo" required
                    placeholder="Enter Phonenum"/>
                </Form.Group>
                <Form.Group controlId="Location"> 
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="Location" required
                    placeholder="Enter Location"/>
                </Form.Group>
                <Form.Group controlId="Address"> 
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="Address" required
                    placeholder="Enter Address"/>
                </Form.Group>
                <Form.Group controlId="UserStatus"> 
                    <Form.Label>User status</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select User Status</option>
                        <option value="exam not started">exam not started</option>
                        <option value="exam started">exam started</option>
                        <option value="exam completed">exam completed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="ImageName"> 
                    <Form.Label>Image file name</Form.Label>
                    <Form.Control type="text" name="ImageName" required
                    placeholder="Enter image name"/>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Add User
                    </Button>
                </Form.Group>
            </Form>
        </Col>
        <Col sm={6}>
            <Image width="200px" height="200px" src={this.imgsrc}/>
            <input onChange={this.handleFileSelected} type="File"/>
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
