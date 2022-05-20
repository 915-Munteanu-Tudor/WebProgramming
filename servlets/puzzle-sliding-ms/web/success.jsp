<%--
  Created by IntelliJ IDEA.
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Success</title>
    <style>
    form{
        float:left;
    }</style>


</head>
<body>

<%
    //delete existing cookie and create new one for keeping score
    Cookie cookie;
    Cookie[] cookies;

    // Get an array of Cookies associated with the domain
    cookies = request.getCookies();
    String oldVal="";
    if( cookies != null ) {


        for (Cookie value : cookies) {
            cookie = value;

            if ((cookie.getName()).compareTo("Score") == 0) {
                oldVal = cookie.getValue();
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }

        }
    }
    //increment score
    int v=Integer.parseInt(oldVal)+1;
    Cookie newCookie = new Cookie("Score",String.valueOf(v));
    newCookie.setMaxAge(60*60*24);
    response.addCookie(newCookie);
%>

<div style="clear:both;">
    <!--each from represents a button with an image,on a 3X3 grid -->

<form action="Controller" method="post">
    <input  name="1" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("a1")%>.jpg');height:56px;width:99px;"/>
</form>
<form action="Controller" method="post">
    <input name="2" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("a2")%>.jpg');height:56px;width:99px;"/>
</form>
<form action="Controller" method="post">
    <input name="3" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("a3")%>.jpg');height:56px;width:99px;"/>
</form>
</div ><div style="clear:both;">
<form action="Controller" method="post">
    <input name="4" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("b1")%>.jpg');height:56px;width:99px;"/>
</form>
<form action="Controller" method="post">
    <input name="5" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("b2")%>.jpg');height:56px;width:99px;"/>
</form>
<form action="Controller" method="post">
    <input name="6" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("b3")%>.jpg');height:56px;width:99px;"/>
</form>
</div><div style="clear:both;">
<form action="Controller" method="post">
    <input name="7" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("c1")%>.jpg');height:56px;width:99px;"/>
</form>
<form action="Controller" method="post">
    <input name="8" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("c2")%>.jpg');height:56px;width:99px;"/>
</form>
<form action="Controller" method="post">
    <input name="9" type="submit" value="" style="background-image: url('image_part_00<%=request.getAttribute("c3")%>.jpg');height:56px;width:99px;"/>
</form>
</div>

<div id="logout-section" style="clear:both;">
    <form action="LogoutController" method="post">
        <input type="submit" id="logout-btn" value="Logout" />
    </form>
</div>

</body>
</html>
