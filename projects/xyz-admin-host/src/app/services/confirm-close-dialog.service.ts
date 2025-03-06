import { Injectable } from '@angular/core';

//  ng material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// components
import { ConfirmCloseDialogComponent } from '@components/confirm-close/dialog/confirm-close-dialog/confirm-close-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCloseDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  open(currentConfig?: MatDialogConfig){
    if (this.dialog.openDialogs.length === 1) {
      const dialogConfig: MatDialogConfig = {
        width: '40%',
        autoFocus: true,
      };
  
      const resultConfig = { ...dialogConfig, ...currentConfig };
      const dialogRef = this.dialog.open(ConfirmCloseDialogComponent, resultConfig);
      return dialogRef;
    } else {
      return null;
    }
  }
}
