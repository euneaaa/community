<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<div>
    <h1>비밀번호 변경</h1>
    <div class="msg">${msg}</div>
    <form action="/user/mypage/password" method="post" id="password-frm">
        <div><label>현재 비밀번호 : <input type="password" name="currentupw"></label></div>
        <div><label>변경 비밀번호 : <input type="password" name="upw"></label></div>
        <div><label>확인 비밀번호 : <input type="password" id="confirmupw"></label></div>
        <div><input type="submit" value="변경" id="chanBtn"></div>
    </form>
</div>