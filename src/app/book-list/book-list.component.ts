import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
    });

    this.searchControl.valueChanges.subscribe(searchText => {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  openBookDialog(book: Book | null, mode: 'view' | 'edit' | 'add') {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: { book: book, mode: mode }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  editBook(event: MouseEvent, book: Book) {
    event.stopPropagation();
    this.openBookDialog(book, 'edit');
  }

  deleteBook (event: MouseEvent, bookId: number) {
    event.stopPropagation();
    if (window.confirm("Remove this book from list??")) {
      this.bookService.deleteBook(bookId);
    }
  }
  
}
