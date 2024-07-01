import React, { useState, useEffect } from 'react';
import { Table, Card, CardBody, CardHeader, CardSubtitle, Spinner, Button } from 'react-bootstrap';
import { useQuery } from "@apollo/client";
import { GET_ALL_SCHEDULES } from "../services/queries.ts";
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmDelete } from './ConfirmDelete.tsx'

export default function ListSchedules() {
    const navigate = useNavigate(); 
    
    const { data, loading, error } = useQuery(GET_ALL_SCHEDULES);

    if (loading) return 'Loading';
    if (error) return `Error ${error.message}`;

    const edit = (schedule) => {
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
                    data.getSchedules.map((element, i) =>
                    (
                        <tr>
                            <th scope="row">
                                {i + 1}
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
                                <ConfirmDelete id={element._id} index={i + 1} />
                                <Button onClick={() => edit(element._id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link to="/addschedule"> Add Schedule</Link>
        </>)

} 
