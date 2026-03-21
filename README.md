# 로봇대회 운영 앱

이 폴더는 모바일에서 실행 가능한 PWA 형태의 배포본입니다.

## 포함 화면

- `index.html`: 앱 홈
- `ranking.html`: 기록 경기 순위표
- `bracket.html`: 대진표 생성기

## 로컬 실행

macOS에서는 `start.command`를 실행하면 `http://127.0.0.1:8787/index.html` 로 열립니다.

직접 실행하려면 아래 명령으로도 가능합니다.

```bash
cd /Users/daewon/Documents/robot_record_ranking
python3 -m http.server 8787
```

## 모바일 배포

이 폴더 전체를 정적 호스팅에 업로드하면 됩니다.

- Netlify Drop: 폴더 업로드만으로 바로 배포 가능
- GitHub Pages: 저장소에 올린 뒤 Pages 활성화
- Vercel: 새 프로젝트로 정적 사이트 배포

배포 후에는 모바일에서 `https://` 주소로 접속한 다음 브라우저의 "홈 화면에 추가" 또는 "설치" 기능을 사용하면 앱처럼 실행할 수 있습니다.

## 참고

- PWA 기능은 `file://` 로 직접 열면 제한됩니다.
- 오프라인 캐시는 `service-worker.js` 가 처리합니다.
