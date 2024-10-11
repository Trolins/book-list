import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];
  private booksSubject = new BehaviorSubject<Book[]>(this.books);

  constructor() {
    // Books list initiazilation
    this.books = [
      { id: 1, title: 'Тигролови', author: 'Іван Багряний', year: 2022, description: 'У романі відомого українського письменника Івана Багряного «Тигролови» розповідається про жахливі сторінки історії українського народу — сталінські репресії 30-х років ХХ ст. Рекомендовано програмою загальноосвітньої школи з української літератури.', coverImage: 'https://bookclub.ua/images/db/goods/59278_124001.jpg' },
      { id: 2, title: 'Червоні хащі', author: 'Олександр Сидоренко', year: 2024, description: '«Червоні хащі» — книжка про те, як віднайти загублений або забутий чи вичерпаний роками сенс життя. Це історія мешканців будинку для людей похилого віку, який стоїть посеред лісу біля Черкас. Богдан Васильович Ковтун, колишній шкільний вчитель, приїжджає туди доживати віку. І раптом починає проживати нове, не зовсім зрозуміле йому життя. Там він зустрічає Йосипа Старенького, Журбу, Рибу та найкращого в світі пса. А ще стає свідком та учасником інтриг, дружби та ворожнечі, хитро­мудрих витівок, пустотливих радощів, зворушливого самозречення, подвигів та щемливої людяності, якої то бракує, то раптом стає несподівано багато. Це історія сусідства, співжиття та порозуміння попри розбіжності в біо­графіях. Неважливо, якою мовою ти говориш, які історії мав раніше, де народився, вчився та чи читав класику. Головне, щоб уболівав за наших.', coverImage: 'https://bookclub.ua/images/db/goods/62002_123542.jpg' }
    ];
    this.booksSubject.next(this.books);
  }

  getBooks() {
    return this.booksSubject.asObservable();
  }

  addBook(book: Book) {
    book.id = this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
    this.books.push(book);
    this.booksSubject.next(this.books);
  }

  updateBook(updatedBook: Book) {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
      this.booksSubject.next(this.books);
    }
  }

  deleteBook(bookId: number) {
    this.books = this.books.filter(book => book.id !== bookId);
    this.booksSubject.next(this.books);
  }
}
