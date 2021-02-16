import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { KullaniciService } from "src/Services/kullanici.service";

@Injectable()

export class LoginGuard implements CanActivate
{
    constructor(private kullaniciServis:KullaniciService, private router:Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean
    {
        let logged = this.kullaniciServis.isLoggedIn();
        if (logged)
        {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}