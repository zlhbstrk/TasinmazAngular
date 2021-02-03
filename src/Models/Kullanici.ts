import { YetkiTipi } from "src/Helpers/YetkiTipi";

export class Kullanici {
    id!:number;
    email!:string;
    yetki!:YetkiTipi;
    sifre!:string;
    ad!:string;
    soyad!:string;
    aktifMi!:boolean
}