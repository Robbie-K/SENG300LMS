import java.io.IOException;
import java.util.HashMap;

public class main {
    public static void main(String[] args) throws IOException {
        ReadingInFile readBooks = new ReadingInFile();
        HashMap<String, Book> books = readBooks.makingObjects();

        printBooks(books);



    }

    public static void printBooks(HashMap<String, Book> books){
        for (Book currentBook : books.values()) {
            System.out.println(currentBook.getName() + ", " + currentBook.getAuthor() + ", " + currentBook.getGenre() + ", " + currentBook.getQuantity());
        }
    }
}
