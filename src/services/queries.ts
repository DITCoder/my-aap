import { gql } from "@apollo/client"; 
 
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

export const GET_SCHEDULE = gql`
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

 