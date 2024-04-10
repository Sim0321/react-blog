# React Blog

## WIKI로 이동

> - [WIKI](https://github.com/Sim0321/react-blog/wiki)

## 프로젝트 소개

### 프로젝트를 진행하게 된 계기

그동안은 팀프로젝트로 진행했기에 개인프로젝트를 진행하고 싶었었다. 마침 보고있는 강의도 있었으므로 프로젝트를 진행해보기로 했다.

### 프로젝트를 진행하면서 고민한 부분🤔

강의를 보고 내용을 따라치면 영어타자만 연습할 뿐 기억에 남지 않을 것 같다고 생각했다. 이러한 부분들을 보완하고자

1. 강의와 다른 나만의 디자인으로 구현해 디자인 능력(CSS)과 UX를 고려하는 능력을 향상
2. 강의에 나오는 기능들 뿐만 아니라 있으면 좋겠다고 생각한 기능들을 추가해 개발능력 향상
3. 강의와 다르게 공통 컴포넌트를 제작해 확장성과 유지보수성 향상
4. 강의와 다른 변수명을 사용해 무의식적으로 따라치는 습관 방지

### 기술스택

> - [기술적 의사결정](https://github.com/Sim0321/react-blog/wiki/%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)

## 기능

> - [주요기능](https://github.com/Sim0321/react-blog/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)
> - [다크 모드](https://github.com/Sim0321/react-blog/wiki/%EB%8B%A4%ED%81%AC-%EB%AA%A8%EB%93%9C)

## 이슈대응 및 기여

> - [Icon 공통 컴포넌트](https://github.com/Sim0321/react-blog/wiki/Icon-%EA%B3%B5%ED%86%B5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
> - [로그인 후 새로고침 이슈](https://github.com/Sim0321/react-blog/wiki/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9B%84-%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-%EC%9D%B4%EC%8A%88)
> - [게시글 이미지 생성](https://github.com/Sim0321/react-blog/wiki/%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%83%9D%EC%84%B1)
> - [캐러셀 공통 컴포넌트 이슈](https://github.com/Sim0321/react-blog/wiki/%EC%BA%90%EB%9F%AC%EC%85%80-%EA%B3%B5%ED%86%B5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EC%8A%88)

## 에러

1. firebase cli 사용 중 `firebase login`했지만 `Error: Failed to list Firebase projects. See firebase-debug.log for more info.` 에러 발생.

- `firebase login --reauth`로 재로그인 후 `firebase projects:list`로 firebase 프로젝트들 불러오기.
