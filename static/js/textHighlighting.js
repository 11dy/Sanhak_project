//*변수 선언부*//
const videoFile = document.getElementById("audio-editFile")          //오디오 바
const timeLine = document.getElementsByClassName("timeLine")        //시작-끝 시간
const textSet = document.getElementsByClassName("newStartText")     //문장
const textSetElement = document.getElementsByClassName("newStart")  //문자

//*실행부*//
videoFile.ontimeupdate = function () {now()}
//모튼 문자에 클릭 이벤트 부여
for (i=0; i<textSetElement.length; i++) {
    textSetElement.item(i).addEventListener("click", TextOnClick)
}
//문장 다시 그리기
reText()

//*함수 모음*//
//오디오 진행시 현제 위치 찾아서 하이라이팅
function now(){
    //색 초기화
    for (i=0; i<timeLine.length; i++) {
        timeLine.item(i).parentElement.parentElement.style.backgroundColor='white'
        for (j=1; j<textSet.item(i).children.length; j+=3){    //[start, end, text]
            textSet.item(i).children[j+1].style.color="black"
        }
    }
    //현재 위치 찾기
    for (i=0; i<timeLine.length; i++) {
        const videoFileCopy = videoFile.currentTime
        const timeLineEndTime = timeLine.item(i).lastElementChild.innerHTML / 1000
        if (videoFileCopy < timeLineEndTime) {
            timeLine.item(i).parentElement.parentElement.style.backgroundColor='grey'
            for (j=1; j<textSet.item(i).children.length; j+=3){    //[start, end, text]
                const NewStartEndTime = textSet.item(i).children[j].innerHTML / 1000
                if (videoFile.currentTime < NewStartEndTime){
                    textSet.item(i).children[j+1].style.color="blue"
                    break
                }
            }
            break
        }
    }
}
// [start, end, text] 형태로 출력 되기 때문에 text만 보이게하기
function reText(){
    const textSetCount = textSet.length
    for (i=0; i<textSetCount; i++){
        const textSetChildCount = textSet.item(i).childElementCount
        for(j=2; j<textSetChildCount; j+=3){   //[start, end, text]
            textSet.item(i).children[j].style.display="inline"
        }
    }
}
//단어 클릭시
function TextOnClick(e) {
    const textStartTime = e.target.previousElementSibling.previousElementSibling.innerHTML / 1000
    videoFile.currentTime = textStartTime
    videoFile.play()
}
