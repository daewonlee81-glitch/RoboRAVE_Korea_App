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

## GitHub Pages 배포

이 폴더에는 GitHub Pages용 워크플로가 이미 포함되어 있습니다.

1. 새 GitHub 저장소를 만듭니다.
2. 이 폴더를 그 저장소의 루트로 push 합니다.
3. GitHub 저장소의 `Settings > Pages` 에서 배포 소스를 `GitHub Actions` 로 설정합니다.
4. `main` 브랜치에 push 되면 `.github/workflows/deploy-pages.yml` 이 자동 배포합니다.

배포 주소 형식은 보통 아래와 같습니다.

```text
https://<github-username>.github.io/<repository-name>/
```
## 참고

- PWA 기능은 `file://` 로 직접 열면 제한됩니다.
- 오프라인 캐시는 `service-worker.js` 가 처리합니다.
