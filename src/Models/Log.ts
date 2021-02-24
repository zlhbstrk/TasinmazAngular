import { Durum } from "./Durum";
import { IslemTip } from "./IslemTip";
import { Kullanici } from "./Kullanici";

export class Log{
    Id!:number;
    KullaniciId!:number;
    KullaniciAdi!:string;
    Kullanici!:Kullanici;
    DurumId!:number;
    Durum!:Durum;
    IslemTipId!:number;
    IslemTip!:IslemTip;
    Aciklama!:string;
    Tarih!:Date | string;
    IP!:string;
}