<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<tiles:importAttribute name="menuList"/>
<header class="h-50">
    <div class="flex-container flex-align-center p-lr-20 flex-between">
        <div class="flex-container flex-align-center">
            <c:forEach items="${menuList}" var="item">
                <div class="m-r-20"><a href="/board/list/${item.icategory}" class="font-color-white">${item.nm}</a></div>
            </c:forEach>
        </div>
        <div>
        <c:choose>
            <c:when test="${sessionScope.loginUser == null}">
                <div><a href="/user/login" class="font-color-white">로그인</a> </div>
            </c:when>
            <c:otherwise>
                <div><a href="/user/profile" class="font-color-white">프로필</a> </div>
                <div><a href="/user/logout" class="font-color-white">로그아웃</a> </div>
            </c:otherwise>
        </c:choose>
        </div>
    </div>
</header>