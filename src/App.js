import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Layout from './container/Layout';
import NewEnrollment from './container/enrollment/NewEnrollment';
import OldEnrollment from './container/enrollment/OldEnrollment';
import axios from 'axios'
import InstructionPage from './component/InstructionPage';
import EditNewEnrollmentDetails from './container/enrollment/EditNewEnrollment';
import EditOldEnrollmentDetails from './container/enrollment/EditOldEnrollment';
import AdmissionDetails from './container/enrollment/AdmissionDetails';
import ViewPreregistrationDetails from './container/enrollment/ViewPreregistrationDetails';

function App() {
  return (
    <div id="app" style={{heigt: '100%'}}>
      <Switch>
          <Route path='/'>
            <Layout>
              <Switch>
                <Route 
                  path="/new" 
                  render={(props) => 
                          <NewEnrollment {...props}/>
                }/>
                
                 <Route path="/old" render={(props) => 
                          <OldEnrollment {...props}/>
                }/>
              
                <Route exact path="/admissions/:id/edit" render={(props) => 
                          <EditNewEnrollmentDetails {...props}/>
                }/>
                 <Route exact path="/preregistrations/:id/edit" render={(props) => 
                          <EditOldEnrollmentDetails {...props}/>
                }/>
                 <Route exact path="/admissions/:id/details" render={(props) => 
                          <AdmissionDetails {...props}/>
                }/>
                 <Route exact path="/preregistrations/:id/details" render={(props) => 
                          <ViewPreregistrationDetails {...props}/>
                }/>
                  <Route path="/" render={(props) => 
                   <InstructionPage/>
                }/>
              </Switch>
            </Layout>
         </Route>
        </Switch>
    </div>
  );
}

export default App;
