import { NgModule } from '@angular/core';

import { PdfViewerDialogComponent } from './pdf-viewer.components';
import { MaterialModule } from '../../material.module';
import { MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker';

@NgModule({
  imports: [MaterialModule, MatDialogModule, CommonModule, PdfViewerModule],
  exports: [PdfViewerDialogComponent],
  declarations: [PdfViewerDialogComponent],
  entryComponents: [ PdfViewerDialogComponent ]
})
export class SharedPdfViewerModule { }
