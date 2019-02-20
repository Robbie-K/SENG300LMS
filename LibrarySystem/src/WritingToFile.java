import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class WritingToFile {

    public void writingObjects(HashMap<String, Book> books) throws IOException {
        FileWriter fileWriting = new FileWriter("books.txt");
        PrintWriter printToFile = new PrintWriter(fileWriting);

        for (Map.Entry<String, Book> entry : books.entrySet()) {
            String title = entry.getKey();
            Book currentBook = entry.getValue();
            String author = currentBook.getAuthor();
            String genre = currentBook.getGenre();
            int quantity = currentBook.getQuantity();

            printToFile.printf(title + ", " + author + ", " + genre + ", " + quantity + "\n");
        }
        printToFile.close();

    }
}
