import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class BookDialogComponent {
  bookForm: FormGroup;
  isEditMode: boolean;
  bookImg: string = './assets/book-default.svg'

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book, mode: 'view' | 'edit' | 'add' },
    private bookService: BookService
  ) {
    this.isEditMode = data.mode === 'edit' || data.mode === 'add';

    this.bookForm = this.fb.group({
      id: [{ value: data.book?.id || null, disabled: true }],
      title: [{ value: data.book?.title || '', disabled: data.mode === 'view' }, Validators.required],
      author: [{ value: data.book?.author || '', disabled: data.mode === 'view' }, Validators.required],
      year: [{ value: data.book?.year || '', disabled: data.mode === 'view' }, Validators.required],
      description: [{ value: data.book?.description || '', disabled: data.mode === 'view' }],
      coverImage: [{ value: data.book?.coverImage || '', disabled: data.mode === 'view' }]
    });
  }

  save() {
    if (this.bookForm.valid) {
      if (this.data.mode === 'add') {
        this.bookService.addBook(this.bookForm.value);
      } else if (this.data.mode === 'edit') {
        this.bookService.updateBook(this.bookForm.value);
      }
      this.dialogRef.close();
    }
  }

  edit() {
    this.isEditMode = true;
    this.data.mode = 'edit';
    this.bookForm.enable();
  }

  deleteBook() {
    if (window.confirm("Remove this book from list?")) {
      this.bookService.deleteBook(this.data.book.id);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
