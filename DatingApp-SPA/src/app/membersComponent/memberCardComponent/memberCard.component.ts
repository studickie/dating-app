import {OnInit, Component, Input} from "@angular/core";
import { IUser } from 'src/app/_models/IUser';

@Component({
    selector: "app-member-card",
    templateUrl: "./memberCard.component.html",
    styleUrls: ["./memberCard.component.css"]
})
export default class MemberCardComponent implements OnInit {
    @Input() user: IUser;
    
    constructor(){}

    ngOnInit(){}
}