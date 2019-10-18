import {Routes} from "@angular/router";
import HomeComponent from "./homeComponent/home.component";
import MembersComponent from "./membersComponent/members.component";
import MessagesComponent from './messagesComponent/messages.component';
import ListsComponent from './listsComponent/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import MemberDetailComponent from './membersComponent/memberDetailComponent/memberDetail.component';
import { MemberDetailResolver } from './_resolvers/memberDetail.resolver';
import { MemberListResolver } from './_resolvers/memberList.resolver';

export const appRoutes: Routes = [{
        path: "", 
        component: HomeComponent
    },{
        path: "",
        runGuardsAndResolvers: "always",
        canActivate: [AuthGuard],
        children: [
            {
                path: "members", 
                component: MembersComponent,
                resolve: {
                    users: MemberListResolver
                }
            },{
                path: "members/:id", 
                component: MemberDetailComponent,
                resolve: {
                    user: MemberDetailResolver
                }
            },{
                path: "messages", 
                component: MessagesComponent
            },{
                path: "lists", 
                component: ListsComponent
            }
        ]},
    {
        path: "**", 
        redirectTo: "", 
        pathMatch: "full"
    }
]