<%--
  Created by IntelliJ IDEA.
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Victory!</title>
</head>
<body>
<img src="images.jpg"><br>
<p>YOU WIN</p>

<%
    //delete existing cookie and create new one for keeping score
    Cookie cookie;
    Cookie[] cookies;

    // Get an array of Cookies associated with the domain
    cookies = request.getCookies();
    String oldVal;
    if( cookies != null ) {


        for (Cookie value : cookies) {
            cookie = value;
            //print score
            if ((cookie.getName()).compareTo("Score") == 0) {
                oldVal = cookie.getValue();
                out.print("Score=" + oldVal);
            }

        }
    }

%>
</body>
</html>
