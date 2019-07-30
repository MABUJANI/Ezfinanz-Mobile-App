import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component(
    {
        selector:'page-about',
        templateUrl:'about.html'
    }
)
export class AboutPage{
    constructor(public navctrl:NavController){

    }
    // ezfinweb(){
    //     var link ="http://www.ezfinanz.com/";
    //     this.navctrl.push(link)
    // }

}