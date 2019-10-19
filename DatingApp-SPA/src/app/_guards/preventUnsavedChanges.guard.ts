import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import MemberEditComponent from "../membersComponent/memberEdit.Component.ts/memberEdit.component";

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm("Are you sure you want to continue? Any unsaved changes will be lost");
        }
        return true;
    }
}