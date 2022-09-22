# modules 디렉토리에는 Reducer들을 모아둡니다.

리듀서는 액션을 받아서 처리하는 역할을 수행합니다.

보통 도메인마다 리듀서를 생성해두고, 루트 리듀서(index.js)에 combineReducers를 이용해 멀티 리듀서 환경을 구축합니다.