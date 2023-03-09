import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "uyari-modal",
  template: "<h1 mat-dialog-title>{{title}}</h1>\n" +
    "<div mat-dialog-content>\n" +
    "{{message}}" +
    "</div>\n" +
    "<div mat-dialog-actions>\n" +
    "  <button mat-button mat-dialog-close>Hayır</button>\n" +
    "  <button mat-button cdkFocusInitial [mat-dialog-close]=\"true\">Evet</button>\n" +
    "</div>"
})


export class AlertComponent implements OnInit {

  title: string = "";
  message: string = "";
  cancelButtonText = "Vazgeç";

  constructor(  @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<AlertComponent>) {

    if (data) {
      this.message = data.message || this.message;
      this.title = data.title || this.title;
    }
    this.dialogRef.updateSize('25vw','10vw')

  }

  ngOnInit(): void {
  }
}
