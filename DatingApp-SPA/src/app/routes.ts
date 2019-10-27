import {Routes} from "@angular/router";
import HomeComponent from "./homeComponent/home.component";
import MembersComponent from "./membersComponent/members.component";
import MessagesComponent from './messagesComponent/messages.component';
import ListsComponent from './listsComponent/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import MemberDetailComponent from './membersComponent/memberDetailComponent/memberDetail.component';
import { MemberDetailResolver } from './_resolvers/memberDetail.resolver';
import { MemberListResolver } from './_resolvers/memberList.resolver';
import MemberEditComponent from './membersComponent/memberEdit.Component.ts/memberEdit.component';
import { MemberEditResolver } from './_resolvers/memberEdit.resolver';
import { PreventUnsavedChanges } from './_guards/preventUnsavedChanges.guard';
import { ListsResolver } from './_resolvers/lists.resolver';

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
                path: "member/edit",
                component: MemberEditComponent,
                resolve: {
                    user: MemberEditResolver
                },
                canDeactivate: [PreventUnsavedChanges]
            },{
                path: "messages", 
                component: MessagesComponent
            },{
                path: "lists", 
                component: ListsComponent,
                resolve: {
                    users: ListsResolver
                }
            }
        ]},
    {
        path: "**", 
        redirectTo: "", 
        pathMatch: "full"
    }
]