import { Izvestaj } from "./izvestaj.model";

export interface GrupniIzvestaj {
    izvestaj: Izvestaj[]; 
    vreme: Date;
}