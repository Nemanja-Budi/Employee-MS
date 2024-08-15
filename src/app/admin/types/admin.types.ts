import { CheckBoxFilter, CommonFilter } from "src/app/shared/types/shared.types";

export type GetMemberParams = {
    userName: string;
    firstName: string;
    lastName: string;
    [key: string]: string | number;
  }
  
  export type GetMember = {
    employeFilterDto: GetMemberParams;
    commonFilter: CommonFilter;
  }
  
  export function getDefaultMemberFilter(): GetMemberParams {
    return {
      userName: '',
      firstName: '',
      lastName: '',
    };
  }
  
  export function getMemberCheckBox(): CheckBoxFilter[] {
    const memberCheckBox =[
      { showName: 'Username', name: 'userName', chacked: true },
      { showName: 'Firstname', name: 'firstName', chacked: false },
      { showName: 'Lastname', name: 'lastName', chacked: false },
    ];
    return memberCheckBox
  }