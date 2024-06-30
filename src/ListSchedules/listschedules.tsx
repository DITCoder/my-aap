import React, { useState, useEffect } from 'react';
import { Table, Card, CardBody, CardHeader, CardSubtitle, Spinner, Button } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_SCHEDULES, DELETE_SCHEDULE } from "../services/queries.ts";
import { Link, useNavigate } from 'react-router-dom';

export default function ListSchedules() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(-1);
    const [clickIndex, setclickIndex] = useState(-1);
    const [deleteSchedule, { }] = useMutation(DELETE_SCHEDULE, { refetchQueries: [{ query: GET_ALL_SCHEDULES }] });
    const [toggleValue, setToggleValue] = useState(false);
    const { data, loading, error } = useQuery(GET_ALL_SCHEDULES);
    if (loading) return 'Loading';
    if (error) return `Error ${error.message}`;
    const dele = (id) => {
        console.log(id);
        deleteSchedule({ "variables": { "scheduleId": id } });
    }
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
                                <Button key={i} name={i} onClick={(e) => {
                                    debugger;
                                    setclickIndex(i);

                                    if (toggleValue && (!Number.isNaN(index)) && index === i) {
                                        dele(element._id);
                                    }
                                    else {
                                        setToggleValue(!toggleValue);
                                    }
                                }

                                }>
                                    {(clickIndex == i) && 'Confirm Delete'}
                                    {(clickIndex != i) && 'Delete'}
                                </Button>&nbsp;
                                {(clickIndex == i) && <Button onClick={() => { setclickIndex(-1) }}>Cancel</Button>}
                                <span>
                                    {clickIndex == i && (<><label>Type index</label>
                                        <span><input type='number' value={index} onChange={(a) => {
                                            debugger;
                                            setIndex(parseInt(a.target.value))
                                        }}></input></span></>)}
                                </span>
                                <Button onClick={() => edit(element._id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link to="/addschedule"> Add Schedule</Link>
        </>)

} 
