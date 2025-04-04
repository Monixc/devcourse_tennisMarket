# 테니스 마켓

웹 퍼블리싱과 node.js, mariadb 사용을 배운 후 실습을 위해 제작한 테니스 마켓 사이트입니다.
<br><br>

## [![My Skills](https://skillicons.dev/icons?i=html,css,javascript,nodejs,mysql)](https://skillicons.dev)

![Screenshot 2025-04-04 at 22 13 01](https://github.com/user-attachments/assets/bfe5f216-f764-483f-a9bb-4f9c0d9b1f2a)

## 구조

```
TennisShoppingMall/
├── assets/              # 제품 이미지 폴더
│   ├── blue.png
│   ├── yellow.png
│   └── black.png
├── database/            # 데이터베이스 연결 설정
│   └── connect/
│       └── mariadb.js   # MariaDB 연결 설정
├── index.js             # 애플리케이션 진입점
├── server.js            # HTTP 서버 설정
├── router.js            # 라우팅 처리
├── requestHandler.js    # 요청 처리 로직
├── index.html           # 메인 페이지 HTML
├── orderlist.html       # 주문 내역 페이지 HTML
└── main.css             # 스타일시트
```

## 배운점

**1. Node.js와 데이터베이스 연결**

- Node.js 환경에서 mariadb 등 데이터베이스 연결 방법 학습
- mysql 모듈을 활용하여, 데이터베이스 연결 설정 및 쿼리 실행

**2. 데이터베이스를 활용한 웹 요소 조작**

- DB에서 가져온 데이터를 동적으로 HTML에 반영하는 방법
- `orderlist` 함수에서 DB 조회 결과를 사용해 테이블 행 동적 생성:
  ```javascript
  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    rows.forEach((element) => {
      response.write(
        "<tr>" +
          "<td>" +
          element.product_id +
          "</td>" +
          "<td>" +
          element.order_date +
          "</td>" +
          "</tr>"
      );
    });
  });
  ```

**3. 라우팅 시스템 구현**

- URL 경로에 따라 다른 핸들러 함수를 연결하는 라우팅 설계
- 객체 리터럴을 활용한 간단한 라우터 구성
  ```javascript
  let handle = {};
  handle["/"] = main;
  handle["/order"] = order;
  handle["/orderlist"] = orderlist;
  ```
- 쿼리 파라미터 추출 및 활용 방법

---

Node.js에서 직접 데이터베이스를 연결하고 데이터를 처리하는 과정을 처음으로 경험하면서, 서버와 클라이언트 간 데이터 흐름을 더 잘 이해할 수 있었다.
DB에서 받아온 데이터를 동적으로 html 테이블에 렌더링하는 처리가 인상적이었다.

한편으로는 코드가 길어지면서, 비효율적이지 않을까라는 생각이 들었다. 사용 중인 정적 콘텐츠(blue.png, yellow.png, black.png, main.css)를 각각 별도의 핸들러 함수로
처리하고 있는데, 리소스가 많아질수록 코드가 중복되고 비대해질 것 같다. 정적 파일을 일괄적으로 처리하는 방법을 더 알아봐야겠다.

이번 실습에서는 별다른 프레임워크나 라이브러리 없이, `Node.js`의 기본 모듈만 사용해서 구현하면서, http 통신과 서버의 기본을 학습할 수 있었다.
앞으로는 `Express` 같은 프레임워크를 활용하여, 더 체계적인 개발을 배워보고 싶다.
