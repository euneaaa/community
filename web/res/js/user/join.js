{
    const joinFrmElem = document.querySelector('#join-frm');
    const idRegex = /^([a-zA-Z0-9]{4,15})$/;
    const pwRegex = /^([a-zA-Z0-9!@_]{4,20})$/;
    const nmRegex = /^([가-힣]{2,5})$/;

    var idChked = 2;
    const setIdChkMsg = (data) => {
        const idChkMsgElem = joinFrmElem.querySelector("#id-chk-msg");
        switch (data.result){
            case 0:
                idChkMsgElem.innerText = '이미 사용중인 아이디 입니다.'
                idChked = 0;
                break;
            case 1:
                idChkMsgElem.innerText = '사용할 수 있는 아이디 입니다.'
                idChked = 1;
                break;
        }
    }

    if(joinFrmElem){
        joinFrmElem.addEventListener('submit', (e) => {
            const uid = joinFrmElem.uid.value;
            const upw = joinFrmElem.upw.value;
            const nm = joinFrmElem.nm.value;
            if(!idRegex.test(uid)){
                alert('아이디는 대소문자, 숫자로만 4~15글자가 되어야합니다.');
                e.preventDefault();
            }else if(!pwRegex.test(upw)){
                alert('비밀번호는 대소문자, 숫자, !,@,_로만 4~15글자가 되어야합니다.');
                e.preventDefault();
            }else if(nmRegex.test(nm)){
                alert('이름은 한글로 2~5글자가 되어야합니다.');
                e.preventDefault();
            }
            if(idChked !==1){
                switch (idChked){
                    case 0 :
                        alert('다른 아이디를 사용해주세요.');
                        break;
                    case 2:
                        alert('아이디 중복 체크를 해주세요.');
                        break;
                }
            }e.preventDefault();
        });

        joinFrmElem.uid.addEventListener('keyup', () => {
            const idChkMsgElem = joinFrmElem.querySelector("#id-chk-msg");
            idChkMsgElem.innerText = '';
            idChked = 2;
        })
        //아이디 중복체크 버튼
        const idBtnChkElem = joinFrmElem.querySelector('#id-btn-chk');
        idBtnChkElem.addEventListener('click',() => {
            const idVal = joinFrmElem.uid.value; //string
            if(idVal.length < 4) {
                alert("아이디를 4자 이상 작성 해 주세요.")
                return;
            }
            //리터럴 템플릿(문자열 안에 변수 넣기 편함)
            fetch(`/user/idChk/${idVal}`)
                .then(res => res.json())
                .then((data) => {
                    setIdChkMsg(data);
                }).catch((e)=> {
                console.log(e);
            });


        });
    }


}