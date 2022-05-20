import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Vector;

public class Randomize {
    private Statement stmt;
    public Randomize(){connect();}
    public void connect() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost/puzzle", "root", "");
            stmt = con.createStatement();
        } catch(Exception ex) {
            System.out.println("error at connection : "+ex.getMessage());
            ex.printStackTrace();
        }
    }
    public ArrayList<Integer> Generate(){
        ArrayList<Integer> order=new ArrayList<>();
        order.add(1);
        order.add(2);
        order.add(3);
        order.add(4);
        order.add(5);
        order.add(6);
        order.add(7);
        order.add(8);
        order.add(9);
        //generate random order
        Collections.shuffle(order);
        try {
            //save order to database
            stmt.executeUpdate("delete from location");
            for (int i=1;i<10;i++) {
                stmt.executeUpdate("insert into location (filename,id) values ('"+ order.get(i-1)+"'," + i+")");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return order;
    }

    public ArrayList<Integer> move(int clicked) {
        //if the filename is adjacent to filename 9 , swap their places
        int[][] table = new int[5][5];
        ArrayList<Integer> order = new ArrayList<>();
        int clickI = 0, clickJ = 0;
        try {
            ResultSet rs = stmt.executeQuery("select * from location order by id");
            for (int i = 1; i <= 3; i++) {
                for (int j = 1; j <= 3 && rs.next(); j++) {
                    table[i][j] = Integer.parseInt(rs.getString(1));
                    if (i * 3 - 3 + j == clicked) {
                        clickI = i;
                        clickJ = j;
                    }
                }
            }
            if(clickI!=0 && clickJ!=0) {
                if (table[clickI - 1][clickJ] == 9) {
                    int swap = table[clickI][clickJ];
                    table[clickI][clickJ] = table[clickI - 1][clickJ];
                    table[clickI - 1][clickJ] = swap;
                } else if (table[clickI + 1][clickJ] == 9) {
                    int swap = table[clickI][clickJ];
                    table[clickI][clickJ] = table[clickI + 1][clickJ];
                    table[clickI + 1][clickJ] = swap;
                } else if (table[clickI][clickJ - 1] == 9) {
                    int swap = table[clickI][clickJ];
                    table[clickI][clickJ] = table[clickI][clickJ - 1];
                    table[clickI][clickJ - 1] = swap;
                } else if (table[clickI][clickJ + 1] == 9) {
                    int swap = table[clickI][clickJ];
                    table[clickI][clickJ] = table[clickI][clickJ + 1];
                    table[clickI][clickJ + 1] = swap;
                }
            }
            for (int i = 1; i <= 3; i++)
                for (int j = 1; j <= 3; j++) {
                    order.add(table[i][j]);

                }

            for (int i=1;i<10;i++) {
                stmt.executeUpdate("update location set filename="+order.get(i-1)+" where id="+i);
            }
            return order;
        } catch (SQLException e) {
            e.printStackTrace();
        }
    return null;
    }
}
