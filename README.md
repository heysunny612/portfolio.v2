# 프론트엔드 포트폴리오 "코드러버써니"

<br/>

| 제목 | 설명 |
| --- | --- |
| 사이트명 | 코드러버써니 |
| 프로젝트 소개 | 프론트엔드 개발자인데, 아직도 포트폴리오를 PDF, 노션으로 만들고 있나요? <br/> 본인을 면접관에게 강력하게 어필할 수 있는, 나만의 사이트를 만들고 싶지 않나요? <br/> 이것을 제가 구현했습니다!! “코드러버써니”는 단순히 포트폴리오만 나열 하는 사이트가 아닌, <br/> 저와 직접 소통할 수 있는 넓고 넓은 웹 세계 속의 나만의 “집”같은 공간입니다. <br/>저는 웹사이트에 애니메이션을 구현하는 것을 좋아합니다.  여러분의 눈을 즐겁게 만들 수 있는 많은<br/> 애니메이션이 있으니 한 번 구경하러 오세요!|
| 기획 기간 | 2023.06.28 ~ 2023.07.01 |
| 개발 기간  | 2023.07.02 ~ 2023.07.26 기능 구현 완료. 버그 발견 즉시 수정 중 |
| 기술 스택  | HTML&CSS, REACT, TYPESCRIPT |
| 데이터베이스  | FIREBASE |
| 라이브러리 |  axios, emailjs-com, framer-motion, react-hook-form, react-intersection-observer, <br/> react-loading-skeleton, react-query, react-quill, react-router-dom, react-slick, react-tag-input, <br/> react-type-animation, scss, slick-carousel, three|
| 배포 주소  | [Netlify https://sunny-trello.netlify.app/](https://codeloversunny.netlify.app/) |
| 소스 코드  | [Github https://github.com/heysunny612/ts-trello](https://github.com/heysunny612/portfolio.v2) |

<br/>
<br/>

## 폴더구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📂channelTalk
 ┃ ┗  📂firebase
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂Avatar
 ┃ ┣ 📂Button
 ┃ ┣ 📂Comments
 ┃ ┣ 📂Footer
 ┃ ┣ 📂Gallery
 ┃ ┣ 📂Header
 ┃ ┣ 📂Profile
 ┃ ┣ 📂Projects
 ┃ ┣ 📂Question
 ┃ ┣ 📂Reply
 ┃ ┣ 📂Review
 ┃ ┣ 📂ScrollBtns
 ┃ ┣ 📂SendEmail
 ┃ ┣ 📂Skeleton
 ┃ ┣ 📂Slider
 ┃ ┣ 📂SocialLogin
 ┃ ┣ 📂Tags
 ┃ ┗📂UI
 ┣ 📂context
 ┣ 📂data
 ┣ 📂hooks
 ┣ 📂interfaces
 ┣ 📂pages
 ┣ 📂styles
 ┗ 📂utils
```

| 폴더이름 | 용도 |
| --- | --- |
| api | 파이어베이스(Auth와 DB 컬렉션 별로 분리) 및 채널톡 함수 정의 |
| assets | 사이트에 사용된 이미지, 아바타glb, ico 파일들|
| components | 사이트내에서 여러번 사용되는 경우, 컴포넌트로 구성 |
| context  | USER 상태를 어플리케이션 전반적으로 사용하기 위해 사용 |
| data  | 스킬아이콘, 교육리스트, 갤러리 포토, 토이프로젝트 리스트등 파이어베이스 DB에 저장되지 않는 정적 데이터 관리 |
| hooks  | React-query의 staleTime, mutate등을 한번에 관리할 수 있도록 hooks로 분리 |
| pages | Route 구성에 따른 페이지 |
| styles | 어플리케이션 전반적으로 사용되는 공통 styles |
| utils  | 공통으로 사용되는 utils 함수 (Framer-motion varients 함수, 밀리세컨드를 날짜로 변환해주는 formatDate 함수등) |

<br/>
<br/>


## 구현 화면

## 1. 포트폴리오 페이지 

### 1-1. 포트폴리오 검색 기능

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
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/6b271f9f-f047-4c80-b824-a3f7fea815f2" alt="이미지" />
</p>


* 로그인을 한 회원이라면 공개, 비공개 선택하여 질문 작성 가능
* 비공개로 작성된 질문은 Admin과 작성자만 질문, 답변 확인 가능 
* Show More 버튼으로 5개씩 볼 수 있도록 구현 
* Search Keyword에 Keyword를 입력하면 질문 내용으로 검색될 수 있도록 구현 
* 답변이 작성된 질문은 삭제되지 못하도록 구현 

<br/>
<br/>

## 4. 로그인 & 회원가입 

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/ed315742-80a3-4202-85bd-46b3b4509aea" alt="이미지" />
</p>


* 파이어 베이스 Authentication 연결하여, 로그인 및 회원가입 구현   
* 기업회원으로 가입한다면, 파이어 베이스 실시간 데이터에 해당 uid 등록하여, 따로 관리될 수 있게 구현
* 기업회원으로 로그인한다면, 상단 이력서 다운로드하기 가능 
* 구글 및 깃허브 로그인 연동
  

<br/>
<br/>

## 5. 마이페이지 구현

<div align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/68b51d81-a434-4097-b205-78631b31dbd1" alt="이미지" />
</div>

<div align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/787e066f-e74a-48d7-b982-0f3a1e459acb" alt="이미지" />
</div>

​

* "나의 프로필" 페이지에서 닉네임 또는 회사명 수정 가능하도록 구현 
* 좋아요를 누른 프로젝트가 있다면, "관심 프로젝트"에서 해당 프로젝트 리스트 확인할 수 있도록 구현 
* 프로젝트에 댓글을 달았다면, "나의 댓글" 페이지에서 어떤 프로젝트에 댓글을 달았는지 확인이 가능하며, 해당 페이지에서 삭제 또는 수정이 가능하도록 구현  
* AskMe 페이지에 남긴 질문이 있다면 "나의 질문"페이지에서 한눈에 확인이 가능하며, 나의 댓글과 마찬가지로 해당 페이지에서 삭제 또는 수정이 가능하도록 구현
* 파이어 베이스 계정 탈퇴 구현 


<br/>
<br/>

## 6. 그 외 로그인 관련 로직

<p align="center">
  <img src="https://github.com/heysunny612/portfolio.v2/assets/127499117/a02a748b-f855-45b8-b6ca-156bc25ca017" alt="이미지" />
</p>


* 로그인하지 않는 상태임에도 불구하고, 주소창에 mypage 등의 로그인이 필요한 페이지를  직접 입력하여 접근이 안되도록  ProtectedRoute 컴포넌트를 추가하여, 로그인 페이지로 redirect 구현 
* 이 외, 파이어 베이스 실시간 데이터에 admins 사용자의 uid를 등록하여, 해당 uid로 로그인한 사용자는 admin 권한이 부여될 수 있도록 구현 

<br/>
<br/>


## 코드러버써니 개발자의 미니 인터뷰 😆

### 이 프로젝트를 진행하면서 어떤 문제가 있었고, 어떻게 해결했나요?

첫번째는 저의 포트폴리오 사이트는 블로그 페이지, 포트폴리오 페이지에서 이미지 업로드 할 수 있습니다. 블로그 페이지는 Quill을 사용하여 편집이 가능하기 때문에, 에디터에 이미지를 업로드 할 때 파이어 베이스 Storage에도 업로드 될 수 있도록 구현했습니다. 그런데, 막상 직접 구현된 기능을 사용하여, 블로그를 업데이트 할 때, 몇가지 문제점이 발생하였습니다.  <br/>
파이어베이스에 업로드 되었는데, 등록 취소를 누른다면? <br/>
파이어베이스에 업로드 되었는데, 이미지를 지운다면? <br/>
가장 처음 등록된 이미지가 썸네일이 될 수 있도록 구현하였는데, 등록된 첫번째 이미지를 등록 전 삭제한다면?  <br/>
충분한 시간을 가지고 여러 방향으로 테스트를 하였고, Form이 전송 될 때,  파이어베이스에 업로드된 이미지 URL과 업데이트(등록)하고자 하는 이미지 URL을 비교하여, 에디터 상에서 이미지 수정, 삭제를 하였어도 최종적으로 등록하고자 하는 이미지 URL만 스토리지에 남기고, 나머지는 삭제해주어 스토리지와 실제 등록된 이미지를 동기화 하였습니다.  <br/>
이 결과, 무분별한 이미지 업로드를 방지할 수 있어 스토리지 용량을 절감할 수 있었습니다.

 <br/>
 <br/>

두번째는 프로젝트에 타입스크립트를 적용했던 것입니다. 비록 이 프로젝트를 통해 많이 성장했지만, 아직까지 완벽하게 타입스크립트를 적용하고, 활용 수 있는 단계는 아니라고 생각합니다.  <br/> 
개발하면서 약 50% 이상의 오류가 타입오류 였던 것으로 기억됩니다. 오류가 발생할 때, 저는 절대 any타입으로 지정하여 오류를 무시하지 않았고, 해당 오류에 대해 구글링을 하거나 노마드코더와 제로베이스의 강의를 통해 도움을 받으며 프로젝트를 진행했습니다. <br/>
개발 중간중간에 타입스크립트 학습을 위해 시간을 많이 할애해야 했기 때문에 개발 속도가 느려진 날도 있었습니다. 때로는 타입스크립트 공부 때문에 개발 자체를 완전히 진행하지 못한 날도 있었지만, 만약 타입스크립트를 사용하지 않았더라면 오류를 찾고 그것을 수정하는데에 훨씬 더 많은 시간이 든다는걸 알기때문에 미숙하더라도 타입스크립트를 사용하는 것을 포기하지 않고 끝까지 완주했습니다. 

 <br/>
 <br/>
 




