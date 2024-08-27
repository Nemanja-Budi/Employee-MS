import { Links } from "src/app/shared/types/shared.types";

export function getEmployesRoutes(): Links[] {
    const employeLinks: Links[] = [
        {
          linkName: 'Employes',
          linkRoute: 'employes/employe',
          imgName: 'employe.png'
        },
        {
          linkName: 'Salarys',
          linkRoute: 'employes/salary',
          imgName: 'payroll.png'
        },
        {
          linkName: 'Vacation',
          linkRoute: 'employes/annual-leave',
          imgName: 'agenda.png'
        }
    ];
    return employeLinks;
}

export function getMPRoutes(): Links[] {
    const mpLinks: Links[] = [
        {
          linkName: 'Products',
          linkRoute: '#',
          imgName: 'in-stock.png'
        },
        {
          linkName: 'Warehouse',
          linkRoute: '#',
          imgName: 'warehouse.png'
        },
        {
          linkName: 'Calculation',
          linkRoute: '#',
          imgName: 'calculator.png'
        }
    ];
    return mpLinks;
}