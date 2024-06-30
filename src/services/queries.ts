import { gql, TypedDocumentNode } from "@apollo/client"; 
import  { Schedule, Ata } from "../classes/schedule";
 
export const EDIT_SCHEDULE = gql`
mutation EditSchedule ($createScheduleSchedule: ScheduleInput) {
  editSchedule(
    schedule: $createScheduleSchedule
  ) 
}
`;

export const ADD_SCHEDULE = gql`
mutation CreateSchedule ($createScheduleSchedule: ScheduleInput) {
  createSchedule(
    schedule: $createScheduleSchedule
  ) {
    _id
    scheduleId
    email
    subject
    message
    cron
  }
}
`;
 
export const DELETE_SCHEDULE = gql`
mutation DeleteSchedule ($scheduleId: String!) {
  deleteSchedule(
    id : $scheduleId
  )  
}
`;
export const GET_ALL_SCHEDULES = gql`
query ExampleQuery { 
  getSchedules { 
    _id
    scheduleId
    email
    subject
    message
    cron
   }
}

`;

interface Variables {
  id: string;
}
export const GET_SCHEDULE : TypedDocumentNode<Ata, Variables> = gql`
query ScheduleQuery($id: String!) { 
  scheduleById(id: $id) { 
    _id
    scheduleId
    email
    subject
    message
    cron
   }
}

`;

 