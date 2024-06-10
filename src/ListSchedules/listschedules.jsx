import React, { useState , useEffect} from 'react';
import { Table, Card, CardBody, CardHeader, CardSubtitle, Spinner, Button } from 'reactstrap';
import { useRef } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import Schedule from "../classes/schedule.ts";
import { GET_ALL_SCHEDULES, DELETE_SCHEDULE } from "../services/queries.ts";
import {Link} from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";

export default function ListSchedules()  {  


    const navigate =  useNavigate();
    const [deleteSchedule, { rowsdeleted, deleteerror }] = useMutation(DELETE_SCHEDULE,{refetchQueries:[{query: GET_ALL_SCHEDULES}]});

    const { data, loading, error } = useQuery(GET_ALL_SCHEDULES); 
    if (loading) return 'Loading';
    if (error) return `Error ${error.message}`;  
  const dele = (id) =>{
    console.log(id);
    deleteSchedule({"variables": { "scheduleId": id} });
    }
const edit =(schedule) =>{
    navigate(`/addschedule/${schedule}`);
}
 console.log(data);
     return (  
        <>
        <Table hover>
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Subject
                    </th>
                    <th>
                        Message
                    </th>
                    <th>
                        Cron
                    </th>
                </tr>
            </thead>
            <tbody>{
            data.getSchedules.map((element ,i) => 
               ( 
                    <tr>
                    <th scope="row">
                    {i}
                    </th>
                    <td>
                     {element.email}
                    </td>
                    <td>
                     {element.subject}
                    </td>
                    <td>
                    {element.message}
                    </td>
                    <td>
                    {element.cron}

                    </td>
                    <td>
                    <Button onClick={() => dele(element._id)}>Delete</Button>&nbsp;
                    <Button onClick={() => edit(element._id)}>Edit</Button>
                    </td>
                    </tr>
            ))} 
            </tbody>
        </Table> 
        <Link to="/addschedule"> Add Schedule</Link>
        </>)
 
} 
