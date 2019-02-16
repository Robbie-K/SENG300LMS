import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

public class ReadingInFile {
    public static void main(String [] args) throws IOException{
        String file = "books.txt";
        BufferedReader fileReader = new BufferedReader(new FileReader(file));

        String currentLine = fileReader.readLine();
        System.out.println(currentLine);
        String[] lineSplit = currentLine.split(",");
        Book currentbook = new Book();
        HashMap<String, Book> bookHashmap = new HashMap<String, Book>();

        //strip, trim
        String title = lineSplit[0].trim();
        String author = lineSplit[1].trim();
        String genre = lineSplit[2].trim();
        int quantity = Integer.valueOf(lineSplit[3].trim());

        currentbook.setName(title);
        currentbook.setAuthor(author);
        currentbook.setGenre(genre);
        currentbook.setQuantity(quantity);

        bookHashmap.put(title, currentbook);

        fileReader.close();
    }
}
