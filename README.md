## Sanhak_project

더존비즈온 산학 프로젝트

- 콜센터 음성 라벨링 도구 개발


## What's New

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

