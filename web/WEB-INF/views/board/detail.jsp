<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
<c:if test="${sessionScope.loginUser.iuser == data.iuser}">
    <div>
        <button id="modBtn">수정</button>
        <button id="delBtn">삭제</button>
    </div>
</c:if>
<div id="data" data-icategory="${data.icategory}" data-iboard="${data.iboard}" data-iuser="${sessionScope.loginUser.iuser}"></div>
<div>
    <c:if test="${requestScope.prevNext.previboard>0}">
        <a href="/board/detail?iboard=${requestScope.prevNext.previboard}">이전글</a>
    </c:if>
    <c:if test="${requestScope.prevNext.nextiboard>0}">
        <a href="/board/detail?iboard=${requestScope.prevNext.nextiboard}">다음글</a>
    </c:if>
</div>
<div>
    <div>카테고리: ${data.categorynm}</div>
    <div>조회수: ${data.hits} | 등록일시: ${data.rdt}</div>
    <div>글쓴이: ${data.writernm}</div>
    <div>제목: <c:out value="${data.title}" /></div>
    <hr>
    <div><c:out value="${data.ctnt}" /></div>
</div>
<c:if test="${sessionScope.loginUser != null}">
    <div>
        <form id="cmtFrm">
            <input type="text" name="ctnt"><input type="button" id="btn_submit" value="댓글달기">
        </form>
    </div>
</c:if>
<div id="cmt_list">댓글 목록</div>
</div>

