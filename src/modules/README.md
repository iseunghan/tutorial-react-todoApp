# modules 디렉토리에는 Reducer들을 모아둡니다.

리듀서는 액션을 받아서 처리하는 역할을 수행합니다.

보통 도메인마다 리듀서를 생성해두고, 루트 리듀서(index.js)에 combineReducers를 이용해 멀티 리듀서 환경을 구축합니다.

프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야합니다.
- 프로미스가 시작, 성공, 실패했을때 다른 액션을 디스패치해야합니다.
- 각 프로미스마다 thunk 함수를 만들어주어야 합니다.
- 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 합니다.
