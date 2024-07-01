import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { GET_ALL_SCHEDULES, DELETE_SCHEDULE } from "../services/queries.ts"; 
import { Button } from 'react-bootstrap';

export function ConfirmDelete(value: { id: string, index: number }) {
    debugger;
    const [toggleValue, setToggleValue] = useState(false);
    const [confirmIndex, setconfirmIndex] = useState(0);
    const [rowIndex, setrowIndex] = useState(0);
    const [deleteSchedule, { loading, error }] = useMutation(DELETE_SCHEDULE,
        { refetchQueries: [{ query: GET_ALL_SCHEDULES }] });

    const dele = (id) => {
        console.log(id);
        deleteSchedule({ "variables": { "scheduleId": id } });
    }
    if (toggleValue)
        return (<><Button onClick={() => 
            {
            if (value.index === confirmIndex) {
                    dele(value.id);
                    setconfirmIndex(-2);
                }
            }}>
            Confirm Delete</Button>
            <Button onClick={() => { setToggleValue(!toggleValue) }}>Cancel</Button>

            <span>
                <label>Type index</label>
                <span>
                    <input type='number' onChange={(a) => { setconfirmIndex(a.target.valueAsNumber) }}></input>
                </span>
            </span>
        </>)

    return <><Button onClick={() => { setToggleValue(!toggleValue) }}>Delete</Button></>
}

export default ConfirmDelete;