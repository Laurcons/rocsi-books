import { Book } from "@prisma/client";

export default class BookHelper {

  static humanizeObtainMode(book: Book) {
    return (
      book.obtainMode === 'BOUGHT' ? 'Cumpărată' :
        book.obtainMode === 'RECEIVED' ? 'Primită' :
          book.obtainMode
    );
  }

}