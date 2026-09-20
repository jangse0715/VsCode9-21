function toggle(s){
  s.classList.toggle("on");
}

function closeBar(){
  document.querySelector(".leftBar").classList.remove("on");
  document.querySelector(".rightBar").classList.remove("on");
}

const showWindow = document.querySelector('#showWindow');

const imagesInput = document.querySelector('#imagesInput');
imagesInput.addEventListener('click', ()=>{
  hiddenInput.click();
});
const leftList = document.querySelector('.leftList');

const hiddenInput = document.querySelector('#hiddenInput');
hiddenInput.addEventListener('change', (input)=>{
  const inputList = input.target.files;  /* 파일 선택 및 선택된 리스트 */
  if (inputList.length === 0) return; /* 선택된 파일이 없으면 종료 */

  Array.from(inputList).forEach(file => {   /* 선택된 파일들 왼쪽 이미지 리스트에 추가 */
    const reader = new FileReader();    /* 파일 데이터를 읽어들이기 위한 FileReader 객체 */

    reader.onload = function(e) {        /* 파일 읽기가 완료되었을 때 실행될 함수 */
      const imageSrc = e.target.result;  /* 이미지의 Base64 주소 */

      const imgWrapper = document.createElement('div'); /* 왼쪽 바에 추가할 이미지 Wrapper 구조 */
      imgWrapper.className = 'thumbImg';
      imgWrapper.style.cssText = `
                width: 100%;
                displaly: block;
                object-fit: cover;
            `;
      
      const imgElement = document.createElement('img');  /* 실제 이미지 태그 */
      imgElement.src = imageSrc;
      imgElement.style.cssText =  `
                width: 97%;
                display: block;
                object-fit: cover;
            `;
      
      const deleteBttn = document.createElement('button');
      deleteBttn.type = 'button';
      deleteBttn.className = 'deleteBttn';
      deleteBttn.innerHTML = '&times;';  // '×' 모양의 HTML 특수문자

      deleteBttn.addEventListener('click', (e) =>{
        e.stopPropagation();
      });

      /* 구조 조립 */
      imgWrapper.appendChild(imgElement);   
      imgWrapper.appendChild(deleteBttn);   
      leftList.appendChild(imgWrapper);

      /* 🎁🤢🤢🤢🎁 다음 단계 확장할 때 필요한 구조 정의는 이어서*/
      imgWrapper.addEventListener('click', ()=>{
        showWindow.innerHTML = '';    /* showWindow 영역 value 초기화 */
        const printImg = document.createElement('img');
        printImg.src = imageSrc;    /* 왼쪽 리스트에서 클릭한 썸네일의 이미지와 동일한 주소 사용 */
        
        /* showWindow 레이아웃을 해치지 않도록 스타일 잡기 */
        printImg.style.cssText = `
                width: 90%;
                height: 90%;
                object-fit: contain;    
                display: block;
                margin: 0 auto;
                `
        showWindow.appendChild(printImg);   /* showWindow 영역에 완성된 이미지 집어넣기 */

        imgWrapper.classList.add('active');
      });
    };
    reader.readAsDataURL(file);   /* 파일을 Data URL(Base64) 형태로 읽기 */
  });
  hiddenInput.value = ''; /* 동일한 파일도 연속해서 올릴 수 있도록 input 값 초기화 */
});