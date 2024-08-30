import { CheckBoxFilter, CommonFilter, Links } from "src/app/shared/types/shared.types";

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

export function getAdminRoutes(): Links[] {
  const adminLinks: Links[] = [
    {
      linkName: 'Dashboard',
      linkRoute: 'admin/dashboard',
      imgName: 'dashboard.png'
    },
    {
      linkName: 'Users',
      linkRoute: 'admin/users',
      imgName: 'group.png'
    },
    {
      linkName: 'Add user',
      linkRoute: 'admin/add-new-user',
      imgName: 'add-user.png'
    },
    {
      linkName: 'Logs',
      linkRoute: 'admin/audit-logs',
      imgName: 'log.png'
    },
    {
      linkName: 'Bank',
      linkRoute: 'banks/bank',
      imgName: 'bank.png'
    },
  ];
  return adminLinks
}

