import { ComponentType } from "@angular/cdk/portal";


export interface IModalConfig {
    component: ComponentType<any>,
    inputs: {
        [key: string]: any
    },

    outputs: {
        [key: string]: ()=>void
    }
    hasBackdrop?: boolean;
}