import { CheckBoxFilter, CommonFilter } from "src/app/shared/types/shared.types";

export type GetAnnualLeave = {
  employeFilterDto: GetAnnualleaveParams;
  commonFilter: CommonFilter;
}

export type GetAnnualleaveParams = {
    firstName: string;
    lastName: string;
    [key: string]: string | number;
}

export type DeleteMessage = {
  message: string;
}


export function getDefaultAnnualLeaveFilter(): GetAnnualleaveParams {
  return {
    firstName: '',
    lastName: ''
  };
}

export function getAnnualLeaveCheckBoxes(): CheckBoxFilter[] {
  const annualLeaveCheckBox = [
    { showName: 'Ime', name: 'firstName', chacked: true },
    { showName: 'Prezime', name: 'lastName', chacked: false },
  ];
  return annualLeaveCheckBox;
}

// export type GetAnnualleaveParams = {
//     firstName: string;
//     lastName: string;
//     // bankName: string;
//     [key: string]: string | number;
//   }


// export type GetAnnualLeave = {
//     employeFilterDto: GetAnnualleaveParams;
//     sortBy: string;
//     isAscending: boolean;
//     pageNumber: number;
//     pageSize: number;
// }
  
