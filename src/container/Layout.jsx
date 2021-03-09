import React from 'react';
import { Navbar, Nav, NavDropdown, ListGroup, Accordion, Card, Button, Table, Form, FormControl} from 'react-bootstrap';
import styles from '../sidemenu.css';
import logo from '../assets/images/logo.png';
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { BASE_SERVER_URL } from '../utils/BaseServerUrl';
import axios from 'axios';
import swal from 'sweetalert';
import GenericRequest from '../utils/GenericRequest';
import { Computer, ArrowForward, AccountBox, FolderOpen, GroupAdd, Send, Work, SyncAlt , Poll,Assignment, Settings, Apps, VpnKeyOutlined, Close, PeopleAlt, SignalCellularAlt, GroupWork, AssignmentInd, BusinessCenter, Apartment, School, EmojiPeople, LocationOn, SupervisorAccount, DateRange, Help, ContactPhone, FindInPage, Build, Schedule, PermContactCalendar, Functions, CastConnected, VerticalSplit, ExitToApp, LibraryAddCheck, PlaylistAddCheck, PlaylistAdd} from '@material-ui/icons';

export default class Layout extends React.Component {
    render(){

        let linkStyle = {
            color: '#424242',
            fontSize: '14px',
            textDecoration: 'none',
            backgroundColor: '#EEEEEE',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
        }
    
        return(
            <div>
                  <div style={{borderBottom: '1px solid rgba(0,0,0,.125)', width: '100%', height: '50px'}}>
            <Navbar expand="lg" bg="info" fixed="top" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', height: '50px'}} >
                <Navbar.Brand href="../../../home" style={{position: 'absolute', left: '50%', display: 'block', width: '200px', marginLeft: '-100px'}}>
                    <img src={logo} alt="" style={{width: '30px'}}/>
                    <span style={{marginLeft: '10px', color: '#E0F7FA'}}>ENROLLMENT PORTAL</span>
                </Navbar.Brand>              
            </Navbar>
            </div>
            
            <Table className="main-layout" responsive style={{display: 'flex', flexDirection: 'column', flex: "1 1 100%", height: '100%'}}>
                <tbody style={{height: '100%'}}>
                    <tr style={{height: '100%'}}>               
                        <td style={{padding: '0px', border: 'none', width: '100%'}}>
                            {this.props.children}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Navbar expand="lg" bg="info" fixed="bottom" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', padding: '0'}} >
                    <div className="bg-light text-dark" style={{ height: '3rem', width: '100%', paddingTop: '10px'}}>
                        <center>Luna Colleges @ 2020</center>
                    </div>
            </Navbar>
        </div>
        )
    }
}