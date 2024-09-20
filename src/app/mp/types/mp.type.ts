import { Links } from "src/app/shared/types/shared.types";

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