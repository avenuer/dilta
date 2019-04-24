import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export enum PdfDialogActions {
  Print = 'Print',
  Close = 'Close'
}

export interface DialogData {
  link: string | undefined;
}


@Component({
  selector: 'shared-pdf-viewer-dialog',
  template: `
  <div class="container">
     <!-- <pdf-viewer
      scale="page-width"
      show-all="true"
      class="hive-pdf"
        [src]="data.link">
    </pdf-viewer> -->
    <div class="row" >
    <button mat-button color="secondary" (click) ="dialogRef.close(close)" > {{ close }} </button>
    <button mat-button color="primary" (click) ="dialogRef.close(print)"> {{ print }} </button>
    </div>
  </div>
  `,
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerDialogComponent {
  public print = PdfDialogActions.Print;
  public close = PdfDialogActions.Close;
  constructor(
    public dialogRef: MatDialogRef<PdfViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.close);
  }
}
