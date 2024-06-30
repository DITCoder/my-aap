import { Suspense, useTransition, useState, useEffect} from "react"; 
import {useForm} from "react-hook-form";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import {
  useSuspenseQuery,
  useBackgroundQuery,
  useReadQuery,
  gql,
  TypedDocumentNode,
  QueryRef,
  useQuery,
  useLazyQuery,
  useMutation
} from "@apollo/client";
import {ADD_SCHEDULE, EDIT_SCHEDULE, GET_ALL_SCHEDULES, GET_SCHEDULE} from "../services/queries.ts"
import React from "react";
import { Ata, Schedule } from "../classes/schedule.ts"; 

export default function Form() {  
  return (
   <>
   <div>Schedule</div>
      <EditSchedule/>
        </> 
  );  
}
 
  function EditSchedule( ) {
    let isSkip : boolean = true;
    const navigate = useNavigate();
    const pramScheduleId =  useParams().scheduleId!;
    if(pramScheduleId!) isSkip = false;
    const [addSchedule] = useMutation(!pramScheduleId  ? ADD_SCHEDULE : EDIT_SCHEDULE,
      {refetchQueries:[{query: GET_ALL_SCHEDULES}]});
    const { data, error , loading} = useQuery(GET_SCHEDULE, {variables:{id : pramScheduleId},  skip: isSkip});

    debugger;
    const {register, handleSubmit, setValue, formState: { errors }} =  useForm();
 
    if(error) return <p>Ops! Something went wrong</p>
    if(loading) return(<>Loading...</>);


 debugger;
  if(data != undefined)
    {
          setValue("_id",data?.scheduleById._id);
          setValue("cron",data?.scheduleById.cron);
          setValue("email",data?.scheduleById.email);
          setValue("message",data?.scheduleById.message);
          setValue("subject",data?.scheduleById.subject); 
  }
  function onsSubmit(schedule) 
  {
    debugger;
    addSchedule({"variables": { "createScheduleSchedule": schedule} }).then((x) =>{
      console.log(x);
      navigate("/");
    });
    console.log(JSON.stringify(schedule));
  }
  return (
    <> 
        <form onSubmit={handleSubmit(onsSubmit)} >
        <div className="row  d-flex justify-content-center" >
                <div className="col-sm-5">
                  <label htmlFor="email" className="form-label">Email Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"  
                    {
                     ...register("email", 
                      {
                        required : { value : true, message : "Email is required" },
                        maxLength : { value: 50, message:"Should be less then 50" },
                        pattern : { value: /^\S+@\S+\.\S+$/, message:"Invalid email address" }
                      })    
                    }
                  /> 
                {errors.email && <p>{`${errors.email.message }`}</p>}
                </div>
              </div>
              <div className="row  d-flex justify-content-center" >
                <div className="col-sm-5">
                  <label htmlFor="subject" className="form-label">Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"  
                    {
                     ...register("subject", {
                      maxLength : { value: 75, message:"Should be less then 75 chars" }
                      
                      })    
                    }
                  /> 
                {errors.subject && <p>{`${errors.subject.message }`}</p>}
                </div>
              </div>
              <div className="row  d-flex justify-content-center" >
                <div className="col-sm-5">
                  <label htmlFor="subject" className="form-label">Message:</label>
                  <textarea 
                    className="form-control"
                    id="message"  
                    {
                     ...register("message", {
                      maxLength : { value: 75, message:"Should be less then 150 chars" }
                      })    
                    }
                  /> 
                {errors.message && <p>{`${errors.message.message }`}</p>}
                </div>
              </div>
              <div className="row  d-flex justify-content-center" >
                <div className="col-sm-5">
                  <label htmlFor="cron" className="form-label">Cron:</label>
                  <input 
                    className="form-control"
                    type="text"
                    id="message"  
                    {
                     ...register("cron", {
                      maxLength : { value: 10, message:"cron" }
                      })    
                    }
                  /> 
                {errors.cron && <p>{`${errors.cron.message }`}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button onClick={() =>navigate("/")}>Cancel</button>
                  <input type="submit" className="primary" value={"Submit"} /> 
              </div>
              </div> 
        </form>
    </>
  );
}
 
 