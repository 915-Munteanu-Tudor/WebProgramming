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


public class Generator extends HttpServlet{
    public  Generator(){super();}
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException {


        RequestDispatcher rd;
        Randomize ran=new Randomize();
        //generate random order for images
        ArrayList<Integer> order=ran.Generate();
        rd = request.getRequestDispatcher("/success.jsp");
        //send order of images to client
        request.setAttribute("a1", order.get(0));
        request.setAttribute("a2", order.get(1));
        request.setAttribute("a3", order.get(2));
        request.setAttribute("b1", order.get(3));
        request.setAttribute("b2", order.get(4));
        request.setAttribute("b3", order.get(5));
        request.setAttribute("c1", order.get(6));
        request.setAttribute("c2", order.get(7));
        request.setAttribute("c3", order.get(8));
        //go to success.jsp
        rd.forward(request, response);

    }
}
