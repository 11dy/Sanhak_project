## Sanhak_project

더존비즈온 산학 프로젝트

- 콜센터 음성 라벨링 도구 개발


## What's New
- **(2022/08/02)**

메인 페이지

삭제 버튼을 인식 작업요청 옆으로 옮김

작업 현황 드롭다운 버튼을 만듬

--> 후에 인식 작업시 addclass를 이용해 

드롭다운에서 선택한 항목만 표시하도록 수정예정

페이징 처리 구현


- **(2022/07/28)**

메인페이지, 작업 페이지 프로토 타입 구현

인식 작업 요청 팝업창 수정

작업페이지 하단 오디오 재생 기능 구현

- **(2022/07/27)**

부트스트랩 이용위해 static 디렉터리에 
부트스트랩 파일을 위한 디렉터리들 생성

부트스트랩 기능을 이용하기 위해 
base.html 에 jquery script 추가

js파일 링크추가

work_list.html에 인식 작업 요청 클릭시 나오는
모달(팝업)창 추가


- **(2022/05/20)** 


## Getting Started

* **라이브러리 설치**

``` bash
pip install --upgrade pip

pip3 install -r requirements.txt 
```

* **DB 설정 변경**  
  db_config 내부 파일 수정

``` bash
# postgresql
{
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "[DB명]",
        "USER": "[USER NAME]",
        "PASSWORD": "[PWD]",
        "HOST": "[IP]",
        "PORT": "[PORT]",
        "IS_MASTER": true
    }
}

```

## React 주의 사항
* ** git update 후**
* ** node-moudles 안의 패키지 설치**
``` bash 
npm install --force

```

* ** react 모듈 설치 시**
* ** package.json 안에 담김**
``` bash 
npm install --save {패키지명}

```
