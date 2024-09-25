import { ProizvodIzvestaj } from "./proizvod-izvestaj.model";

export interface Izvestaj {
    proizvod: ProizvodIzvestaj
    ukupnaUlaznaVrednost: number; 
    ukupnaIzlaznaVrednost: number;
    razlikaVrednosti: number;
    ukupnaUlaznaKolicina: number; 
    ukupnaIzlaznaKolicina: number;
    razlikaKolicina: number;
    prosecnaVrednost?: number;
}