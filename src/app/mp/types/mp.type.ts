import { Links } from "src/app/shared/types/shared.types";

export function getMPRoutes(): Links[] {
    const mpLinks: Links[] = [
        {
          linkName: 'MP',
          linkRoute: 'mp',
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

export function getMPNAVRoutes(): Links[] {
  const mpLinks: Links[] = [
      {
        linkName: 'Otpremnice',
        linkRoute: 'mp/otpremnice',
        imgName: 'in-stock.png'
      },
      {
        linkName: 'Kalkulacije',
        linkRoute: 'mp/kalkulacije',
        imgName: 'warehouse.png'
      },
      {
        linkName: 'Racuni',
        linkRoute: 'mp/racuni',
        imgName: 'calculator.png'
      },
      {
        linkName: 'Prijemnice',
        linkRoute: 'mp/prijemnice',
        imgName: 'calculator.png'
      },
      {
        linkName: 'Izvestaji',
        linkRoute: 'mp/izvestaji',
        imgName: 'calculator.png'
      }
  ];
  return mpLinks;
}