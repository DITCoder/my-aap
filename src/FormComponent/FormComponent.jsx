import React, { useState, useEffect } from 'react'; 
import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
import { useRef } from 'react';
import {  useMutation, useQuery,useLazyQuery } from "@apollo/client"; 
import Schedule from "../classes/schedule.ts";
import {ADD_SCHEDULE, GET_ALL_SCHEDULES, GET_SCHEDULE, EDIT_SCHEDULE} from "../services/queries.ts" ;
import { useNavigate, useParams } from 'react-router-dom';

export const  Form = () =>{
  const params = useParams();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id:'',
    email: '',
    subject: '',
    message: '',
    cron: '',
  });
  const formRef = useRef(null); 
  const [errors,  setErrors] = useState({});
  
  const [addSchedule] = useMutation(!params.scheduleId  ? ADD_SCHEDULE : EDIT_SCHEDULE,{refetchQueries:[{query: GET_ALL_SCHEDULES}]});
debugger;
  const  [loadSchedule, {data,  loading, error }]= useLazyQuery(GET_SCHEDULE,{variables: { id: params.scheduleId}}); 

  const handleChange = (e) => {
    console.log(params);
    console.log(formData);
    
    validateForm({ ...formData,
      [e.target.name]: e.target.value,});

    const { name, value } = e.target;
      setFormData({
      ...formData,
      [name]: value,
    })
  };




 const SaveSchedule =  (schedule ) =>
{
debugger;
  addSchedule({"variables": { "createScheduleSchedule": schedule} }).then((x) =>{
    console.log(x);
    navigate("/");
  });
  // console.log(schedule);
  // const result =  mutation.mutate(Schedule);
  // console.log(result);
} 

 useEffect(()=>{

  loadSchedule().then((r) => {
    console.log('test');
    debugger;
  console.log(r);
  if(r.data != null){
  setFormData({ 
    _id : r.data.scheduleById._id,
    email:r.data.scheduleById.email,
    message :r.data.scheduleById.message, 
    cron :r.data.scheduleById.cron,
    subject :r.data.scheduleById.subject,
    });}
  });

 
    console.log(formData._id);
  }, []
);
// useEffect(() => {
  
  
//   }
// },[]);
 
  const useHandleSubmit = (e) => {
    e.preventDefault();
    const errors  = validateForm(formData);
    
     debugger;

      if (Object.keys(errors).length === 0) {
          
        SaveSchedule({_id: formData._id === ""? undefined: formData._id, email: formData.email, subject: formData.subject, message: formData.message, cron: formData.cron});
    console.log('test');
    setFormData({
      _id: '',
      email: '',
      subject: '',
      message: '',
      cron: '',
    });
    setErrors({});
    }
  };
  const validateForm = (fData) => { 
    //setErrors({});
    //formNode.preventDefault();
    const validationErrors = {};
    // Validation for email address
    if (!fData.email.trim()) {
      validationErrors.email = 'Email address is required';
    } else if (
      !/^\S+@\S+\.\S+$/.test(fData.email.trim())
    ) {
      validationErrors.email = 'Invalid email address';
    }
    
    // Validation for subject
    if (fData.subject.trim().length === 0) {
      console.log('test');
      validationErrors.subject = 'Subject is required';
    }
    // Validation for message
    if (!fData.message || !fData.message.trim()) {
      validationErrors.message = 'Message is required';
    }
    
    // Validation for cron expression
    if (!fData.cron || !fData.cron.trim()) {
      validationErrors.cron = 'Cron expression is required';
    } else if (
      !(/^[*0-9]{1,5}$/).test(
        fData.cron.trim()
      )
    ) {
      validationErrors.cron = 'Invalid cron expression';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit the form
      console.log('Form submitted:', fData);
      // Reset form data and errors
      setErrors(validationErrors);
    }
    return validationErrors;
  };

  if (addSchedule.loading || addSchedule.loading) return <Spinner color="dark" />;
  if (addSchedule.error || addSchedule.error) return <React.Fragment>Error :(</React.Fragment>;
  
  // render() {
  //   const { isFetching } = this.state;
  //   return (
  //     <div>
  //       {isFetching ? (
  //         <div>Loading...</div>
  //       ) : (
  //         <div>
  //           <p>
  //             {this.state.phoneNumber} has {this.state.points} points...
  //           </p>
  //           <p>Would you like to redeem or add points?</p>
  //           <div>
  //             <button>Redeem Points</button>
  //             <button>Add Points</button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }


  return ( 

    1===2 ? ( <div>Loading...</div> ) :

   (<div className="container"> {/* Container for center alignment */}
 
      <div class="row">
        <form ref={formRef} onSubmit={useHandleSubmit} className="row g-3"> {/* Add "row g-3" class for Bootstrap grid */}
          <div class="row">
            <div class="col-sm-12">
              <div class="row d-flex justify-content-center">
                <div className="col-sm-5">SCHEDULE<br/></div>
              </div>
              
              <div class="row  d-flex justify-content-center" >
                <div className="col-sm-5">
                  <label htmlFor="email" className="form-label">Email Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  /> 
                  {!!errors.email && <div>{errors.email}</div>}
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div className="col-sm-5">
                  <label htmlFor="subject" className="form-label">Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />{console.log(errors.subject)}
                 {!!errors.subject && <div className="danger">{errors.subject}</div>}
                </div></div>
              <div class="row  d-flex justify-content-center">
                <div className="col-sm-5">
                  <label htmlFor="message" className="form-label">Message:</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {!!errors.message && <div >{errors.message}</div>}
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div className="col-sm-5">
                  <label className="form-label">Cron Expression:</label>
                  <br/>
                  <input
                    type="text"
                    className="form-control"
                    id="cron"
                    name="cron"
                    value={formData.cron}
                    onChange={handleChange}
                  /> 
                  {!!errors.cron && <div>{errors.cron}</div>}
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div className="col-sm-5 ">
                  <br/>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div> )
  ); 
}; 

export default Form;