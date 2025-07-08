# Temporal 문서 한국어 번역 가이드

## 🇰🇷 한국어 번역본 작업

이 브랜치는 Temporal 문서의 한국어 번역을 위한 작업공간입니다.

### 🌐 온라인에서 확인하기
- **한국어 번역본**: https://timothy-jeong.github.io/temporal-ko-docs/
- **원본 문서**: https://docs.temporal.io/ 

### 🚀 로컬 환경에서 한국어 번역본 실행

```bash
# 한국어 번역본으로 개발 서버 시작 (기본 언어가 한국어)
yarn start

# 영어 버전으로 확인하려면
yarn start --locale en

# 빌드 후 확인
yarn build
yarn serve
```

### 📝 문서 번역 작업

새로운 문서를 번역하려면:

1. 원본 파일을 `docs/` 폴더에서 복사
2. `i18n/ko/docusaurus-plugin-content-docs/current/` 경로에 동일한 구조로 저장
3. 내용을 한국어로 번역 (frontmatter의 `id`와 기술 용어는 유지)
4. 로컬에서 테스트

### 📁 한국어 번역 파일 구조

```
i18n/ko/
├── docusaurus-theme-classic/
│   ├── navbar.json     # 네비게이션 메뉴
│   └── footer.json     # 푸터 링크
└── docusaurus-plugin-content-docs/
    ├── current.json    # 사이드바 카테고리
    └── current/        # 번역된 MDX 파일들
        └── {docs와 동일한 경로}
```

### 🔧 번역 상태 확인

```bash
# 한국어 번역 템플릿 생성/업데이트
yarn write-translations --locale ko

# 누락된 번역 키 확인 및 덮어쓰기
yarn write-translations --locale ko --override

# 모든 언어 번역 상태 확인
yarn write-translations
```

### 🚀 GitHub Pages 배포

- **자동 배포**: `main` 브랜치에 푸시하면 자동으로 GitHub Pages에 배포됩니다
- **수동 배포**: [Actions 탭](https://github.com/timothy-jeong/temporal-ko-docs/actions)에서 "Deploy Korean Translation to GitHub Pages" 워크플로우를 수동으로 실행할 수 있습니다
- **배포 확인**: Actions 탭에서 배포 상태를 확인할 수 있습니다

### 📋 번역 가이드라인

- **기술 용어**: 원문 그대로 유지 혹은 병기 (예: Workflow, 액티비티(Activity), Worker 등)
- **UI 요소**: 한국어로 번역
- **코드 예제**: 주석 포함 별도 번역 불필요
- **링크**: 가능한 경우 한국어 페이지로 연결
- **Fallback**: 번역되지 않은 페이지는 자동으로 영어로 표시됩니다

### 🤝 기여 방법

1. 번역할 문서 선택
2. Fork 수행
3. 번역 작업 수행
4. 로컬 테스트
5. `timothy-jeong/temporal-ko-docs/main` 에 대해서 Pull Request 생성

질문이나 도움이 필요한 경우 GitHub Issues를 활용해주세요.
Temporal 문서의 한국어 번역에 기여해주셔서 감사합니다! 🙏 

# 💬 QnA
## 왜 시작했나요?
회사에서 Saga Orchestrator Pattern 을 구현하기 위해 워크플로우 관리 시스템을 알아보던중 Temporal 을 알게되었습니다. 저 개인적으로 Temporal 을 좋아하게 됐는데 그 이유는 아래와 같습니다.

- 단일 프로그래밍 언어 하나로 워크플로우 정의, 실행이 모두 가능하다는점
- 별도 플랫폼에 종속될 필요 없이 워크플로우 관리 시스템을 운용할 수 있다는 점(self host 및 K8s에 종속될 필요 없음)
- 다른 시스템들 보다 더 뛰어난 안정성을 제공한다는점 
- 문서화가 굉장히 잘 되어 있다는 점

이에 저는 한국에서 Temporal 이 대중적인 시스템으로 자리잡길 원했고 그 첫번째 작업으로 한국어 문서 작업을 골랐습니다.

## Temporal Document 자체에서 한국어 번역본을 제공하는게 좋은 접근 아닐까요? 🤔
시도를 안해본건 아닙니다. 실제로 [한국어 번역본 RP](https://github.com/temporalio/documentation/pull/3643) 도 올리고 커뮤니티 슬랙 채널에서 Temporal Document Team 멤버와 이야기도 나눴습니다. 그 결과 현재 Temporal 은 다국어 문서를 유지할 내부 리소스가 없으며, 커뮤니티의 도움이 필요하다는 결론이 나왔습니다.

따라서 이 프로젝트는 **한국 개발자 커뮤니티가 주도하는 독립적인 번역 프로젝트** 입니다.