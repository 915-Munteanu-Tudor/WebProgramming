<%--
  Created by IntelliJ IDEA.
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  <form action="LoginController" method="post">
      Enter username : <label>
      <input type="text" name="username">
  </label> <BR>
      Enter password : <label>
      <input type="password" name="password">
  </label> <BR>
      <a href="game.html"></a>
      <input type="submit" value="Login"/>
  </form>
<%--  <a href="game.html">Start</a>--%>
<%
    //delete existing cookie and create new one for keeping score
        Cookie cookie;
        Cookie[] cookies;

        // Get an array of Cookies associated with this domain
        cookies = request.getCookies();

        if( cookies != null ) {


            for (Cookie value : cookies) {
                cookie = value;

                if ((cookie.getName()).compareTo("Score") == 0) {
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }

            }
        }
    Cookie newCookie = new Cookie("Score","0");
    newCookie.setMaxAge(60*60*24);
    response.addCookie(newCookie);
%>
  </body>
</html>
