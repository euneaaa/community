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
                switch (data.result){
                    case 0 :
                        alert('댓글 등록에 실패하였습니다.');
                        break;
                    default :
                        const cmtListElem = document.querySelector('#cmt_list');
                        let table = cmtListElem.querySelector('table');
                        if(!table){
                            cmtListElem.innerHTML =null;
                            table = makeTable();
                            cmtListElem.appendChild(table);
                        }
                        const item = {
                            icmt: data.result,
                            iuser: parseInt(dataElem.dataset.iuser),
                            writernm: dataElem.dataset.nm,
                            profileimg: dataElem.dataset.profileimg,
                            ctnt: cmtFrmElem.ctnt.value,
                        }
                        const tr = makeTr(item);
                        table.appendChild(tr);

                        cmtFrmElem.ctnt.value = null;
                        window.scrollTo(0,document.body.scrollHeight);
                        break;
                }
            },param);
        }

    }

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
        const cmtListElem = document.querySelector('#cmt_list');
        //댓글이 없으면 "댓글 없음"
        if (list.length === 0) {
            cmtListElem.innerText = '댓글 없음!';
            return;
        }
        const table = makeTable();
        cmtListElem.appendChild(table);

        list.forEach(item => {
            const tr = makeTr(item);
            table.appendChild(tr);
        });
    }

    const makeTable = () => {
        const cmtListElem = document.querySelector('#cmt_list');
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
        return table;
    }

    const makeTr = (item) => {
        const cmtListElem = document.querySelector('#cmt_list');
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
                modBtn.addEventListener('click', () => {
                    const tdArr = tr.querySelectorAll('td');
                    const tdCell = tdArr[1];

                    const modinput = document.createElement('input');
                    modinput.value = item.ctnt;
                    const saveBtn = document.createElement('input')
                    saveBtn.type = 'button';
                    saveBtn.value = '저장';
                    saveBtn.addEventListener('click', ()=>{
                        const param = {
                            icmt: item.icmt,
                            ctnt: modinput.value
                        }
                        myFetch.put('/board/cmt', data => {
                            switch(data.result) {
                                case 0:
                                    alert('댓글 수정에 실패하였습니다.')
                                    break;
                                case 1:
                                    tdCell.innerText = modinput.value;
                                    item.ctnt = modinput.value;
                                    removeCancelBtn();
                                    break;
                            }
                        }, param);
                    })

                    tdCell.innerHTML = null;
                    tdCell.appendChild(modinput);
                    tdCell.appendChild(saveBtn);

                    const cancelBtn = document.createElement('input');
                    cancelBtn.type = 'button';
                    cancelBtn.value = '취소';
                    cancelBtn.addEventListener('click', () => {
                        tdCell.innerText = item.ctnt;
                        removeCancelBtn();
                    });

                    const removeCancelBtn = () => {
                        modBtn.classList.remove('hidden');
                        delBtn.classList.remove('hidden');
                        cancelBtn.remove();
                    }

                    td.insertBefore(cancelBtn, modBtn);
                    modBtn.classList.add('hidden');
                    delBtn.classList.add('hidden');
                });

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
            return tr;
    }

    //하나 받을때는 괄호 안줘도 상관없음
    const delCmt = (icmt, tr) => {
        myFetch.delete(`/board/cmt/${icmt}`, data =>{
            if(data.result){
                tr.remove();

                if(getTrLen()===1){
                    const cmtListElem = document.querySelector('#cmt_list');
                    cmtListElem.innerText='댓글없음';
                }
            }else {
                alert('댓글을 삭제할 수 없습니다.');
            }
        });
    }

    getCmtList();

    //좋아요
    const favIconElem = document.querySelector('#fav_icon');
    const isFav = () =>{
        const iboard = dataElem.dataset.iboard;
        myFetch.get(`/board/fav/${iboard}`,(data)=>{
            console.log(data.result);
            switch (data.result){
                case 0 :
                    disableFav();
                    break;
                case 1:
                    enableFav();
                    break;
            }
        });
    }

    favIconElem.addEventListener('click', () => {
        const iboard = dataElem.dataset.iboard;
        if(favIconElem.classList.contains('far')){
            insFavAjax();
        }else {
            delFav(iboard);
        }
    });

    const insFavAjax = () => {
        const param = {
            'iboard' : dataElem.dataset.iboard
        };
        myFetch.post(`/board/fav`, (data) => {
            console.log(data);
            switch (data.result){
                case 0:
                    alert('실패하였습니다.');
                    break;
                case 1:
                    enableFav();
                    break;
            }
        },param)
    }

    const delFav = (iboard) => {
        myFetch.delete(`/board/fav/${iboard}`, data =>{
            switch (data.result){
                case 0 :
                    alert('실패하였습니다.');
                    break;
                case 1:
                    disableFav();
                    break;
            }
        })
    }

    const disableFav = () => {
        if(favIconElem){
            favIconElem.classList.remove('fas');
            favIconElem.classList.add('far');
        }
    }

    const enableFav = () => {
        if(favIconElem){
            favIconElem.classList.remove('far');
            favIconElem.classList.add('fas');
        }
    }

    if(dataElem.dataset.iuser){
        isFav();
    }

}

const getTrLen = ()=>{
    const cmtListElem = document.querySelector('#cmt_list');
    const trArr = cmtListElem.querySelectorAll('table tr');
    return trArr.length;
}