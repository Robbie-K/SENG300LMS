import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadingInFile {
    public static void main(String [] args) throws IOException{
        String file = "books.txt";
        BufferedReader fileReader = new BufferedReader(new FileReader(file));

        String currentLine = fileReader.readLine();
        System.out.println(currentLine);
        String[] lineSplit = currentLine.split(",");
        //strip, trim
        for(int a = 0; a < lineSplit.length; a++){
            System.out.println(lineSplit[a]);
        }
        fileReader.close();
    }
}
