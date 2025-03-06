import { Injectable } from '@angular/core';

// ng material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// components
import { ConfirmDeleteComponent } from '@pages/lists/dialog/confirm-list-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteDialogService {

  constructor(
    private dialog: MatDialog
  ) { 

  }

  open(currentConfig?: MatDialogConfig) {
    const dialogConfig: MatDialogConfig = {
      width: '40%',
      disableClose: true,
      autoFocus: true
    };

    const resultConfig = { ...dialogConfig, ...currentConfig };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, resultConfig);
    return dialogRef;
  }
}
