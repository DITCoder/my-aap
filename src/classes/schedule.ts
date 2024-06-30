export  class Schedule{
    constructor( public _id : string, public email : string,public subject: string,public message: string,public cron: string ){}
}

export  class Ata
{
    constructor(public scheduleById : Schedule){}
}