public class Book {
    private static String name;
    private static String author;
    private static String genre;
    private static int quantity;

    public void setName(String name){
        this.name = name;
    }
    public void setAuthor(String author){
        this.author = author;
    }
    public void setGenre(String genre){
        this.genre = genre;
    }
    public void setQuantity(int quantity){
        this.quantity = quantity;
    }

    public String getName(){
        return name;
    }
    public String getAuthor(){
        return author;
    }
    public String getGenre(){
        return genre;
    }
    public int getQuantity(){
        return quantity;
    }

}
