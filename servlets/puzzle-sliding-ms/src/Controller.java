import java.io.Console;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class Controller extends HttpServlet{
    public  Controller(){super();}
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException {

        //get clicked button
        int clicked = 0;
        for (int i = 1; i <= 9; i++)
            if (request.getParameter(String.valueOf(i)) != null)
                clicked = i;
        //System.out.println("Clicked :"+clicked);
        RequestDispatcher rd;
        //move item and receive new order of photos
        Randomize ran = new Randomize();
        ArrayList<Integer> order = ran.move(clicked);
        rd = request.getRequestDispatcher("/success.jsp");
        //send order to client
        request.setAttribute("a1", order.get(0));
        request.setAttribute("a2", order.get(1));
        request.setAttribute("a3", order.get(2));
        request.setAttribute("b1", order.get(3));
        request.setAttribute("b2", order.get(4));
        request.setAttribute("b3", order.get(5));
        request.setAttribute("c1", order.get(6));
        request.setAttribute("c2", order.get(7));
        request.setAttribute("c3", order.get(8));
        //verify if game is won
        boolean found = true;
        for (int i = 1; i <= 9; i++)
            if (i != order.get(i - 1)) {
                found = false;
                break;
            }
        if (found)
            rd = request.getRequestDispatcher("/final.jsp");
        rd.forward(request, response);

    }
}

