import React from 'react';
import ViewDetails from '../../component/ViewDetails';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
  
class AdmissionDetails extends React.Component {

    state = {
      title: "Home",
      resource: "",
      enableEdit: true,
      data: {},
      type: "",
      subtype: "new",
      resourceId: 0,
      fields: [
        {
          id: "type",
          label: "Type",
          value: ""
        },
        {
          id: "status",
          label: "Status",
          value: ""
        },
        {
          id: "course",
          label: "Course",
          value: ""
        },
        {
          id: "yearLevel",
          label: "Year",
          value: ""      
        },
        {
          id: "isRegular",
          label: "Is Regular",
          value: ""
        },
        {
          id: "lastName",
          label: "Last Name",
          value: ""  
        },
        {
          id: "firstName",
          label: "FirstName",
          value: ""
        },
        {
          id: "middleName",
          label: "MiddleName",
          value: ""
        },
        {
          id: "gender",
          label: "Gender",
          value: ""
        },
        {
          id: "civilStatus",
          label: "Civil Status",
          value: ""
        },
        {
          id: "birthday",
          label: "Birthday",
          value: ""
        }, 
        {
          id: "age",
          label: "Age",
          value: ""
        },
        // {
        //   id: "occupation",
        //   label: "Occupation",
        //   value: ""
        // },
        {
          id: "presentAddress",
          label: "Present Address",
          value: ""
        },
        {
          id: "emailAddress",
          label: "Email Address",
          value: ""
        },
        {
          id: "mobileNumber",
          label: "Mobile Number",
          value: ""
        },
        {
          id: "guardianName1",
          label: "Parent / Guardian",
          value: ""
        },
        // {
        //   id: "guardianName2",
        //   label: "Guardian 2",
        //   value: ""
        // },
        {
          id: "createdDateTime",
          label: "Date Created",
          value: "",
        },
        {
          id: "updatedDateTime",
          label: "Date Last Updated",
          value: "",
        }
      ],
      tables: [
        {
          title: "Pre-enrolled Classes",
          columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "section", text: "Section", sort: true},
            {dataField: "teacher", text: "Teacher", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
            {dataField: "status", text: "Status", sort: true}
          ],
          data: []
        }
      ]
    }

    componentWillMount(){
      this.state.resourceId = this.props.match.params.id;
      this.getEnrollment(this.state.resourceId);
    }

    getEnrollment(id){
      axios.get(BASE_SERVER_URL + 'admission/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get class 
          let {fields} = this.state;

          if(res.data.status == 'RETURNED'){
            fields.splice(2, 0, {id: 'remarks', label: 'Return Remarks'})
          }

          fields.forEach(function(field){
            if(field.id == 'course'){
              field.value = "" + res.data.course.courseCode;
            } else if(field.id == 'yearLevel'){
              field.value = "" + res.data.yearLevel;
            } else if(field.id == 'studentNumber'){
              field.value = "N/A";
            } else if(field.id == 'isRegular'){
              field.value  = res.data.isRegular ? "Yes" : "No";
            } else if(field.id == 'lastName'){
              field.value = "" + res.data.lastName;
            }else if(field.id == 'firstName'){
              field.value = "" + res.data.firstName;
            }else if(field.id == 'middleName'){
              field.value = "" + res.data.middleName;
            }else if(field.id == 'civilStatus'){
              field.value = "" + res.data.civilStatus;
            }else if(field.id == 'presentAddress'){
              field.value = "" + res.data.presentAddress;
            }else if(field.id == 'gender'){
              field.value = "" + res.data.gender;
            }else if(field.id == 'mobileNumber'){
              field.value = "" + res.data.mobileNumber;
            }else if(field.id == 'emailAddress'){
              field.value = "" + res.data.emailAddress;
            }else if(field.id == 'birthday'){
              field.value = "" + res.data.birthday;
            }else if(field.id == 'guardianName1'){
              field.value = "" + res.data.guardianName1;
            // }else if(field.id == 'guardianName2'){
            //   field.value = "" + res.data.guardianName2;
            // }else if(field.id == 'occupation'){
            //   field.value = "" + res.data.occupation;
            }else if(field.id == 'age'){
              field.value = "" + this.calculate_age(res.data.birthday)
            }else if(field.id == 'updatedBy'){
              if(res.data['updatedBy']){
                field.value = "" + res.data.updatedBy.schoolId;
              } else {
                field.value = "None";
              }
            } else if(field.id == 'createdBy'){
              if(res.data['createdBy']){
                field.value = "" + res.data.createdBy.schoolId;
              } else {
                field.value = "None";
              }
            } else {
              field.value = res.data[field.id]
            }
          }.bind(this))

            let table = this.state.tables[0];
            table.data = [];
            res.data.classes.map(function(item){
              let result = {};
              result['id'] = item.id;
              result['no'] = table.data.length + 1;
              result['classCode'] = item.classCode
              result['subject'] = item.subject.subjectCode;
              result['section'] = item.section.course.courseCode + " " + item.section.year + "-" + item.section.sectionNumber;
              result['teacher'] = item.teacher.lastName.toUpperCase() + ", " + item.teacher.firstName
              result['room'] = item.room.roomName;
              result['status'] = item.status;
              let schedule = "";
              item.schedule.map(function(sched, i){
                if(i != 0){
                  schedule += " | "
                }
                schedule += sched.day + " " + sched.time.timeStart + "-" + sched.time.timeEnd;
              })
              result['schedule'] = schedule;
              table.data.push(result)

            });
          this.state.tables[0] = table;
          
          this.setState({fields: fields, resource: res.data.firstName + " " + res.data.lastName, table: table})
      });
    }

    calculate_age = (dob1) => {
      var today = new Date();
      var birthDate = new Date(dob1); 
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age_now--;
      }
      return age_now;
    }


    render(){
       return ( <ViewDetails values={this.state} sideContent={this.props.children}/>)
    }


}

export default AdmissionDetails;