# 프론트엔드 포트폴리오 "코드러버써니"

<br/>

| 제목 | 설명 |
| --- | --- |
| 사이트명 | 코드러버써니 |
| 기획 기간 | 2023.06.28 ~ 2023.07.01 |
| 개발 기간  | 2023.07.02 ~ 2023.07.26 기능 구형 완료. 버그 발견 즉시 수정 중 |
| 배포 주소  | [Netlify https://sunny-trello.netlify.app/](https://codeloversunny.netlify.app/) |
| 소스 코드  | [Github https://github.com/heysunny612/ts-trello](https://github.com/heysunny612/portfolio.v2) |

<br/>

## 1. 포트폴리오 페이지 

### 1-1. 포트폴리오 검색 기 능

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/c73da897-0793-43bf-9ed1-7ac12ec25bdb" alt="이미지" />
</p>

<br/>

* 프로젝트에 사용된 스킬을 최대 3개까지 선택하여 검색 가능하도록 구현
* 선택된 키워드가 전송되는 Form과 선택된 태그(checkbox)는 React hook form을 사용 
* 검색 키워드가 포함되어 있는 프로젝트라면, 포함된 #SKILL에 색상을 추가하여, 어떤 키워드로 검색되었는지 확인 가능할 수 있도록 UI 구현
* React Router Dom 을 사용하여, 선택된 스킬은 param으로 전달. Router-dom을 이용하였기 때문에 사용자가 뒤로 가기를 눌러도, 이전에 검색된 결과를 다시 볼 수 있도록 UI 구현  
* 검색 버튼인 필터를 누르면, 프로젝트 리스트로 스크롤을 이동시켜 사용자가 결과를 바로 볼 수 있도록 구현

<br/>
<br/>

### 1-2. 프로젝트 "좋아요" 기능 구현  

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/7abc72de-2c14-424d-992e-0cc6998cb59b" alt="이미지" />
</p>

<br/>

* 로그인 상태라면, 프로젝트에 좋아요를 누를 수 있는 기능을 구현
* 각 프로젝트 DB에 like 객체 데이터를 추가하여, key 값은 해당 유저의 uid, 값은 boolean으로 주어, 하트를 누를 때마다 반대의 값으로 값이 토글 되도록 함으로써 좋아요 기능 구현 
* 포트폴리오 상세 페이지에서도 마찬가지로 좋아요를 할 수 있으며, 좋아요를 누른 사용자들의 리스트 또한 확인 가능
* 코드 러버 써니의 모든 파이어 베이스 데이터관리는 React-Query를 사용하였으며, Mutate를 사용하여, CRUD가 업데이트되었을 때, 적절하게 데이터를 새로 불러올 수 있도록 구현


<br/>
<br/>

### 1-3. 프로젝트 댓글 기능 구현  

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/cafd8a0c-4ac5-4766-b4c4-393a7a349533" alt="이미지" />
</p>

* 로그인한 상태라면, 각 프로젝트마다 댓글을 등록할 수 있도록 기능 구현 
* 입력한 댓글은 메인 페이지 "What people are saying"에 실시간으로 출력될 수 있도록 구현 
* 댓글에도 대댓글이 가능하며, 댓글은 "projectId"로 Comment DB를 생성하여 관리,  대댓글은 댓글이 작성된 "commentId"로 Reply DB 생성하여 데이터를 각각 분리하여 관리


<br/>
<br/>


## 2. 블로그 페이지

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/e2dd32f9-659e-4a97-b57e-a75d7a1fa478" alt="이미지" />
</p>

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/3b75c442-257f-440c-9f22-945380c2ede2" alt="이미지" />
</p>

* React Quill 에디터를 사용하여, Create 구현 
* 스페이스  또는 엔터로 태그를 입력할 수 있도록 구현 ( React-tag-input 라이브러리 사용) 
* 에디터에 업로드된 이미지는, 파이어 베이스 Storage에 저장될 수 있도록 구현 
* 원하는 카테고리를 입력받아, 카테고리 별로 출력 될 수 있도록 구현

<br/>
<br/>


## 3. 에스크미 (AskMe) 페이지 

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/1d9a6d77-71f0-4fe1-8662-727a2e2fc155" alt="이미지" />
</p>

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/1d9a6d77-71f0-4fe1-8662-727a2e2fc155" alt="이미지" />
</p>

* 로그인을 한 회원이라면 공개, 비공개 선택하여 질문 작성 가능
* 비공개로 작성된 질문은 Admin과 작성자만 질문, 답변 확인 가능 
* Show More 버튼으로 5개씩 볼 수 있도록 구현 
* Search Keyword에 Keyword를 입력하면 질문 내용으로 검색될 수 있도록 구현 
* 답변이 작성된 질문은 삭제되지 못하도록 구현 




