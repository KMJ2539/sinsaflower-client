# 🌼 신사플라워

Next.js 기반으로 제작한 온라인 꽃집 플랫폼입니다. <br>
발주, 수주, 정산관리 흐름을 제공하며 반응형 UI와 SEO 최적화를 목표로 개발되었습니다.

## 1. 기술 스택

| 범주                | 사용 기술                            |
| ------------------- | ------------------------------------ |
| **프레임워크**      | Next.js 15, React 19                 |
| **언어**            | TypeScript 5                         |
| **스타일링**        | TailwindCSS 3, PostCSS, Autoprefixer |
| **HTTP 통신**       | Axios                                |
| **폼 관리**         | React Hook Form 7                    |
| **유틸리티**        | clsx                                 |
| **기타 라이브러리** | react-daum-postcode (주소 검색)      |
| **린팅/품질**       | ESLint 9, eslint-config-next         |
| **패키지 매니저**   | Yarn 4 (Berry)                       |

## 2. 브랜치 전략

### 기본 브랜치

| 브랜치명 | 설명                  |
| -------- | --------------------- |
| main     | 운영(배포) 브랜치     |
| develop  | 기능 개발 통합 브랜치 |

### 단계별 브랜치

| 브랜치명   | 설명                |
| ---------- | ------------------- |
| phase/dev  | 전체 기능 구현 단계 |
| phase/test | QA 및 테스트 단계   |
| phase/seo  | SEO 및 최적화 단계  |

## 3. 폴더 구조

```bash
src/
├── app/                 # Next.js App Router
├── features/            # 기능 단위 모듈
├── shared/              # 컴포넌트, 훅, lib 등 공통
```

## 4. 주요 기능

🌸 회원 관리 (신청/승인)
🛒 수주/발주
💳 정산 관리
📱 반응형 UI 및 SEO 최적화

## 5. 실행 방법

```bash
yarn install
yarn dev
```
