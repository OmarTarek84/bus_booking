import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './UI/spinner/spinner.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    exports: [
        CommonModule,
        SpinnerComponent
    ]
})

export class SharedModule {}
