import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Scanner;

public class ReadingInFile {

    public HashMap<String, Book> makingObjects() throws IOException{
        File bookFile = new File("books.txt");
        Scanner scan = new Scanner(bookFile);

        HashMap<String, Book> bookHashmap = new HashMap<String, Book>();
        while(scan.hasNextLine()){
            String currentLine = scan.nextLine();
            String[] lineSplit = currentLine.split(",");
            Book currentbook = new Book();
            //strip, trim
            String title = lineSplit[0].trim();
            //System.out.println(title);
            String author = lineSplit[1].trim();
            String genre = lineSplit[2].trim();
            int quantity = Integer.valueOf(lineSplit[3].trim());

            currentbook.setName(title);
            currentbook.setAuthor(author);
            currentbook.setGenre(genre);
            currentbook.setQuantity(quantity);

            bookHashmap.put(title, currentbook);
        }

        scan.close();
        return bookHashmap;
    }
}
