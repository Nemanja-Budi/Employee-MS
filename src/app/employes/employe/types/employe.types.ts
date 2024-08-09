import { CheckBoxFilter, CommonFilter } from "src/app/shared/types/shared.types";

export type GetEmploye = {
    employeFilterDto: GetEmployeParams;
    commonFilter: CommonFilter;
}

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

export function getDefaultEmployeFilter(): GetEmployeParams {
    return {
        firstName: '',
        lastName: '',
        jmbg: '',
        identityCardNumber: '',
        phone: '',
        address: '',
        email: '',
        pio: 0,
        position: '',
        employmentContract: '',
        amendmentContract: '',
        bankName: '',
        currentAccount: 0
    };
}

export function getEmployeCheckBoxes(): CheckBoxFilter[]  {
    const employeFilter = [
        { showName: 'Ime', name: 'firstName', chacked: true },
        { showName: 'Prezime', name: 'lastName', chacked: false },
        { showName: 'Jmbg', name: 'jmbg', chacked: false },
        { showName: 'Br. Lk', name: 'identityCardNumber', chacked: false },
        { showName: 'Telefon', name: 'phone', chacked: false },
        { showName: 'Adresa', name: 'address', chacked: false },
        { showName: 'Email', name: 'email', chacked: false },
        { showName: 'Pio', name: 'pio', chacked: false },
        { showName: 'Pozicija', name: 'position', chacked: false },
        { showName: 'Ugovor o radu', name: 'employmentContract', chacked: false },
        { showName: 'Aneks ugovora', name: 'amendmentContract', chacked: false },
        { showName: 'Banka', name: 'bankName', chacked: false },
        { showName: 'Bankovni racun', name: 'currentAccount', chacked: false },
    ];
    return employeFilter.slice();
}