import React from 'react';
import { Apps, Label, PersonAdd } from '@material-ui/icons';
import { Button, Card, Form, FormControl, ListGroup, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { BASE_SERVER_URL } from '../utils/BaseServerUrl';
import GenericRequest from '../utils/GenericRequest';
import swal from 'sweetalert';

class InstructionPage extends React.Component  {

  // const getList = () => {
  //     axios.get(BASE_SERVER_URL + 'admission',  { 
  //       params: {...GenericRequest(), 
  //           keyword: this.state.keyword,
  //           schoolYear: schoolYear,
  //           semester: semester,
  //           courseCode: course,
  //           yearLevel: yearLevel,
  //           status: status,
  //           type: type,
  //       }
  //   })
  //   .then(res => {
  //       res.data.forEach(function(admission){
            
  //       })

  //       this.setState({data: res.data})
  //   })
  // }
findTrackingNumberAndRedirect(e){
  e.preventDefault();

  let trackingNumber = this.state.tracking;
  axios.get(BASE_SERVER_URL+ 'application',  { params: {...GenericRequest(), trackingNumber: trackingNumber}})
  .then(res => {
    if(res.data.type === "NEW"){
      window.location.href = "/admissions/" + res.data.id + "/details"    
    } else  if(res.data.type === "OLD"){
      window.location.href = "/preregistrations/" + res.data.id + "/details"    
    } else {
      swal("Error!", "Tracking number is not found");
    }
  }).catch(error => {
    swal("Error!", "Tracking number is not found");
  });
}

linkStyle = {
    color: '#424242',
    fontSize: '14px',
    textDecoration: 'none',
    backgroundColor: '#EEEEEE',
    borderRadius: 0,
    borderLeft: 'none',
    borderRight: 'none',
    textAlign: 'center'
}
 
render(){
    return(
     <div style={{ height: '100vh', backgroundColor: '#EEEEEE', width: '100%'}}>
        <div style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <center style={{color: '#616161'}}><b>To proceed with enrollment, please choose from the following:</b></center><br/><br/>
        <Button as={Link} to="/new" variant="outline-info" style={{marginRight: '30px', width: '250px', height: '200px'}}>
         <br/><PersonAdd style={{fontSize: '75px'}}/><br/><br/>I am a <b>NEW</b> student
       </Button>
       <Button as={Link} to="/old" variant="outline-info" style={{width: '250px', height: '200px'}}>
       <br/><PersonAdd style={{fontSize: '75px'}}/><br/><br/>I am an <b>OLD</b> student
       </Button>
       <br/><br/><hr/><br/>
    
          <div>
          <form onSubmit={this.findTrackingNumberAndRedirect.bind(this)} >
          <center><label>I would like to review and modify my application.</label></center>
          <FormControl onChange={(e)=>this.setState({tracking: e.target.value})}placeholder="Enter tracking number sent to your email address..."/>
          </form>

          </div>
        </div>

       
        {/* <div style={{ backgroundColor: '#EEEEEE', width: '300px', paddingTop: '30px', display: 'block', float: 'left'}}>
        <center style={{color: '#FF7043'}}><b>Returned Applications</b><br/><span style={{fontSize: '12px', color: '#616161'}}>Pls. see remarks and modify</span></center>
        <br/>
        <ListGroup>

          <ListGroup.Item className="notification-entry" as={Link} to="/test" style={this.linkStyle}>Ryan Isaig</ListGroup.Item>
      </ListGroup>
        </div> */}
{/* 
        <div style={{ backgroundColor: '#EEEEEE', width: '250px', padding: '10px', paddingTop: '30px', display: 'block', float: 'right'}}>
        <center style={{color: '#616161'}}><b>Rejected Pre-registrations</b><br/><span style={{fontSize: '12px'}}>Pls. see remarks and modify</span></center>
        <br/>
        <ListGroup>
          <ListGroup.Item className="notification-entry" as={Link} to="/test" style={linkStyle}>Ryan Isaig</ListGroup.Item>
      </ListGroup>
        </div> */}
    </div>
   );
  }
}

export default InstructionPage;
