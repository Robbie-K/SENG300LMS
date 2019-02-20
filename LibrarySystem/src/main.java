import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class main {
    public static void main(String[] args) throws IOException {
        ReadingInFile readBooks = new ReadingInFile();
        HashMap<String, Book> books = readBooks.makingObjects();

        Book newBook = new Book();
        newBook.setName("The Doors of Stone");
        newBook.setAuthor("Patrick Rothfuss");
        newBook.setGenre("Fantasy");
        newBook.setQuantity(1);

        books.put("The Doors of Stone", newBook);

        //printBooks(books);

        WritingToFile writingFiles = new WritingToFile();
        writingFiles.writingObjects(books);
    }

    public static void printBooks(HashMap<String, Book> books){
        for (Map.Entry<String, Book> entry : books.entrySet()) {
            String title = entry.getKey();
            Book printBook = entry.getValue();
            System.out.println(title);
        }
    }
}
