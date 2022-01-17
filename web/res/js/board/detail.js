{
    const dataElem = document.querySelector('#data');

    //삭제 버튼
    const delBtnElem = document.querySelector('#delBtn');
    if(delBtnElem) {
        delBtnElem.addEventListener('click', ()=> {
            const icategory = dataElem.dataset.icategory;
            const iboard = dataElem.dataset.iboard;

            if(confirm(msg.fnIsDel(`${iboard}번 글`))) {
                location.href=`/board/del?icategory=${icategory}&iboard=${iboard}`;
            }
        });
    }

    //수정 버튼
    const modBtnElem = document.querySelector('#modBtn');
    if(modBtnElem) {
        modBtnElem.addEventListener('click', ()=> {
            const iboard = dataElem.dataset.iboard;
            location.href=`/board/mod?iboard=${iboard}`;
        });
    }


    const cmtFrmElem = document.querySelector('#cmtFrm');
    if(cmtFrmElem) { // true: 로그인 한 상태
        cmtFrmElem.btn_submit.addEventListener('click', () => {
            const cmtVal = cmtFrmElem.ctnt.value;
            if(cmtVal.length === 0) {
                alert('댓글 내용을 작성해 주세요.');
            } else if(regex.isWrongWith('ctnt', cmtVal)) {
                alert(regex.msg.ctnt);
            } else {
                insBoardCmtAjax(cmtVal);
            }
        });

        const insBoardCmtAjax = (val) => {
            const param = {
                'iboard' : dataElem.dataset.iboard,
                'ctnt' : val
            };
            myFetch.post('/board/cmt', (data) => {
                console.log(data);
            },param);
        }
    }

    const cmtListElem = document.querySelector('#cmt_list');

    //통신 시작!!!
    const getCmtList = () => {
        const iboard = dataElem.dataset.iboard;
        myFetch.get(`/board/cmt/${iboard}`, (list) => {
            console.log(list);
            setCmtList(list);
        });
    }

    //통신 결과물 세팅
    const setCmtList = (list) => {
        //댓글이 없으면 "댓글 없음"
        if (list.length === 0) {
            cmtListElem.innerText = '댓글 없음!';
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>no</th>
                <th>content</th>
                <th>writer</th>
                <th>작성시간</th>
                <th></th>
             </tr>
        `;

        list.forEach(item => {
            const tr = document.createElement('tr');
            const ctnt = item.ctnt.replaceAll('<', '&lt;').replaceAll('>', '&gt');
            const imgSrc = item.profileimg === null
                ? '/res/img/defaultProfile.png'
                : `/images/user/${item.iuser}/${item.profileimg}`;

            tr.innerHTML = `
                <td>${item.icmt}</td>
                <td>${ctnt}</td>
                <td>
                    <div>
                    <span>${item.writernm}</span>
                    <div class="circular--img circular--size30">
                        <img src="${imgSrc}" onerror="this.style.display='none';">
                    </div>
                    </div>
                </td>
                <td>${item.rdt}</td>
            `;

            const td = document.createElement('td');
            tr.appendChild(td);

            if(parseInt(dataElem.dataset.iuser)===item.iuser){
                const modBtn = document.createElement('input');
                modBtn.type = 'button';
                modBtn.value= '수정';

                const delBtn = document.createElement('input');
                delBtn.type = 'button';
                delBtn.value= '삭제';

                delBtn.addEventListener('click', ()=> {
                    if(confirm('삭제하시겠습니까?')){
                        delCmt(item.icmt, tr);

                    }
                });

                td.appendChild(modBtn);
                td.appendChild(delBtn);
            }
            table.appendChild(tr);
        });
        cmtListElem.appendChild(table);
    }
    //하나 받을때는 괄호 안줘도 상관없음
    const delCmt = (icmt, tr) => {
        myFetch.delete(`/board/cmt/${icmt}`, data =>{
            if(data.result){
                tr.remove();
            }else {
                alert('댓글을 삭제할 수 없습니다.');
            }
        });
    }
    getCmtList();

}