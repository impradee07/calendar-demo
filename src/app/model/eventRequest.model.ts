export interface EventRequest {
  eventname: string;
  status: boolean;
  pid: number;
  fromDate: any;
  toDate: any;
  fromTime: string;
  toTime: string;
  eventDescription: string;
  adminid: number;
  adminemail: string;
  userrole: string;
  memberList: string[];
  repeatmode: string;
  weekDays: number[];
  memberDetails: number[];
  memberUpdated: boolean;
}

export interface updateRequest {
  id: number;
  eventname: string;
  status: boolean;
  pid: number;
  fromDate: any;
  toDate: any;
  fromTime: string;
  toTime: string;
  eventDescription: string;
  adminid: number;
  adminemail: string;
  userrole: string;
  memberList: string[];
  repeatmode: string;
  weekDays: number[];
  memberDetails: any[];
  memberUpdated: boolean;
}
