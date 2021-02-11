import { Il } from "./Il";
import { Ilce } from "./Ilce";
import { Mahalle } from "./Mahalle";

export class Tasinmaz {
    Id!:number;
    Il!:Il;
    IlId!:number;
    Ilce!:Ilce;
    IlceId!:number;
    Mahalle!:Mahalle;
    MahalleId!:number;
    Ada!:number;
    Parsel!:number;
    Nitelik!:string;
    Adres!:string;
}