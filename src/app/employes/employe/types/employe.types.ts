export type GetEmployeParams = {
    [key: string]: string | number;
    firstName: string;
    lastName: string;
    jmbg: string;
    identityCardNumber: string;
    phone: string;
    address: string;
    email: string;
    pio: number;
    position: string,
    employmentContract: string,
    amendmentContract: string,
    bankName: string,
    currentAccount: number
}
  
export type GetEmploye = {
    employeFilterDto: GetEmployeParams;
    sortBy: string;
    isAscending: boolean;
    pageNumber: number;
    pageSize: number;
}
