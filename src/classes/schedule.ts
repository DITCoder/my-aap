export default class Schedule{
    constructor( public _id : string, public email : string,public subject: string,public message: string,public cron: string ){}
}