# squarebrackets.ai — 프롬프트 JSON 편집 웹서비스 기획서 v0.1

## 1) 서비스 컨셉

* **한 줄 정의:** “모든 프롬프트를 **JSON**으로 표준화해 작성·공유·실행하는 워크벤치.”
* **핵심 가치:**

  * 프롬프트를 **구조화(typed)** 하고 **재사용 가능한 템플릿**으로 관리
  * LLM 제공사별 파라미터 차이를 **어댑터**로 흡수 → 한번 작성, 멀티 모델 호출
  * 팀 단위 **버전관리/권한/리뷰** 기반 협업
  * **실행 샌드박스**에서 입력 변수만 바꿔 바로 테스트

## 2) 주요 타깃과 페르소나

* **개발자/엔지니어:** API 통합, 자동화, 배치 작업에서 JSON으로 프롬프트/파라미터를 관리하고 싶은 사람
* **프롬프트 디자이너/기획자:** 비개발자도 GUI로 JSON 템플릿을 조립·검증·실행
* **데이터/옵스 팀:** AB 테스트, 로깅/메트릭, 실험 관리 필요

## 3) 핵심 기능 (MVP → 확장)

1. **JSON 템플릿 편집기**

   * 스키마 기반 폼 UI & 코드 편집기(양방향 동기화)
   * Zod/JSON Schema 실시간 검증, 예시 데이터 프리뷰
   * 스니펫/매크로(변수 치환, 조건/반복)
2. **멀티 LLM 어댑터**

   * OpenAI / Anthropic / Google / Azure / DeepSeek 등
   * 공통 상위 스키마 → 프로바이더별 변환기(Adapter)
3. **변수(Variables) & 시크릿 관리**

   * 프로젝트/워크스페이스 스코프의 환경변수
   * KMS/HashiCorp Vault/Azure Key Vault 연동 옵션
4. **실행 샌드박스 (Playground)**

   * 입력 변수/시스템 메시지/샷샘플 설정 후 바로 호출
   * 호출 로그, 토큰/비용 추정, 응답 비교(다중 모델)
5. **버전·협업**

   * 템플릿 버저닝, Diff 뷰, PR-스타일 리뷰 코멘트
   * 역할/권한(Role-Based Access Control)
6. **템플릿 마켓/갤러리** (확장)

   * 공개 템플릿 공유, 포크, 스타, 태그 검색
7. **AB 테스트 & 평가 루프** (확장)

   * 오프라인 골드셋·자동 평가(Metrics, 규칙/정규식/스코어러)
   * 결과 대시보드, 모델/프롬프트 선택 가이드
8. **배포/임베드** (확장)

   * 템플릿을 API 엔드포인트로 노출 (키/쿼터/레이트리밋)
   * SDK/CLI 제공, Webhook 연동

## 4) 정보 구조(IA) & 화면 흐름(Flow)

* **워크스페이스** → **프로젝트** → **템플릿** → **런(run)**
* 주요 화면

  1. 대시보드: 최근 템플릿, 실행 로그, 모델 한눈 요약
  2. 템플릿 리스트: 태그/모델/소유자 필터
  3. 템플릿 편집: 폼/코드 동기, 변수/미리보기, 스키마 유효성
  4. 샌드박스: 입력값 → 응답 비교, 로그/비용
  5. 리뷰/버전: Diff, 코멘트, Merge
  6. 시크릿/환경: 키 관리, 스코프 설정

## 5) 표준 JSON 스키마 설계 (v1 draft)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://squarebrackets.ai/schema/prompt-template.v1.json",
  "title": "PromptTemplate",
  "type": "object",
  "required": ["name", "model", "input", "render"],
  "properties": {
    "name": {"type": "string", "minLength": 1},
    "description": {"type": "string"},
    "tags": {"type": "array", "items": {"type": "string"}},
    "model": {
      "type": "object",
      "required": ["provider", "name"],
      "properties": {
        "provider": {"enum": ["openai", "anthropic", "google", "azure", "deepseek", "custom"]},
        "name": {"type": "string"},
        "params": {"type": "object", "additionalProperties": true}
      }
    },
    "input": {
      "type": "object",
      "description": "사용자가 주입할 변수 정의",
      "additionalProperties": {
        "type": "object",
        "required": ["type"],
        "properties": {
          "type": {"enum": ["string", "number", "boolean", "enum", "object", "array", "file"]},
          "required": {"type": "boolean", "default": false},
          "default": {},
          "enum": {"type": "array"},
          "description": {"type": "string"}
        }
      }
    },
    "render": {
      "type": "object",
      "required": ["format"],
      "properties": {
        "format": {"enum": ["chat", "completion", "json-mode", "tool-calling"]},
        "system": {"type": "string"},
        "messages": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["role", "content"],
            "properties": {
              "role": {"enum": ["system", "user", "assistant"]},
              "content": {"type": "string"}
            }
          }
        },
        "tools": {"type": "array", "items": {"type": "object", "additionalProperties": true}},
        "output": {
          "type": "object",
          "properties": {
            "type": {"enum": ["text", "json", "image"]},
            "schema": {"type": "object"}
          }
        }
      }
    },
    "tests": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "vars"],
        "properties": {
          "name": {"type": "string"},
          "vars": {"type": "object"},
          "expect": {"type": "object", "properties": {"includes": {"type": "array", "items": {"type": "string"}}}}
        }
      }
    }
  }
}
```

### 5-1) 템플릿 예시 (다중 모델 호환)

```json
{
  "name": "product_copy_writer",
  "description": "전달받은 제품 정보를 바탕으로 톤앤매너에 맞는 카피 생성",
  "tags": ["marketing", "copy"],
  "model": { "provider": "openai", "name": "gpt-4o-mini", "params": { "temperature": 0.7 } },
  "input": {
    "product": {"type": "object", "required": true},
    "tone": {"type": "enum", "enum": ["friendly", "luxury", "playful"], "default": "friendly"},
    "lang": {"type": "enum", "enum": ["ko", "en", "ja", "zh"], "default": "ko"}
  },
  "render": {
    "format": "chat",
    "system": "You are a marketing copywriter.",
    "messages": [
      {"role": "user", "content": "제품정보: {{ product }}\n톤: {{ tone }}\n언어: {{ lang }}\n요청: 제품 소개 카피 3가지"}
    ],
    "output": {"type": "json", "schema": {"type": "object", "properties": {"copies": {"type": "array", "items": {"type": "string"}}}}}
  },
  "tests": [
    {"name": "국문 기본", "vars": {"product": {"name": "라이트노트", "features": ["가벼움", "내구성"]}, "tone": "friendly", "lang": "ko"}, "expect": {"includes": ["가벼움"]}}
  ]
}
```

## 6) 프로바이더 어댑터 설계

* **공통 상위 모델**: `PromptTemplate` → 각 제공사 API로 **매핑 함수** 제공
* 예: `openai.chat.completions.create({ messages, temperature, response_format, tools })`
* 정책

  * 공통 필드는 변환, 공급사에만 있는 필드는 `model.params`로 통과
  * JSON 출력 강제는 공급사별 `response_format`/`tool` 전략으로 구현

### 6-1) 어댑터 의사코드 (TypeScript)

```ts
interface AdapterCtx { apiKey: string; baseUrl?: string }
interface RunInput { template: PromptTemplate; vars: Record<string, unknown> }

export async function runWithOpenAI(ctx: AdapterCtx, input: RunInput) {
  const { messages, system, format, output } = renderTemplate(input.template, input.vars);
  const body: any = { model: input.template.model.name, messages: [] };
  if (system) body.messages.push({ role: 'system', content: system });
  body.messages.push(...messages);
  if (input.template.model.params) Object.assign(body, input.template.model.params);
  if (output?.type === 'json') body.response_format = { type: 'json_object' };
  return fetch(`${ctx.baseUrl ?? 'https://api.openai.com'}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${ctx.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json());
}
```

## 7) 프론트엔드 설계 (Next.js + TypeScript)

* **에디터 레이아웃**: 좌(폼) / 우(코드) / 하단(프리뷰)
* **컴포넌트 스택**

  * Next.js(App Router) + React 19
  * UI: Tailwind + shadcn/ui
  * 코드 에디터: Monaco Editor
  * 스키마 폼: `@rjsf`(react-jsonschema-form) 또는 `react-hook-form` + Zod
  * 상태관리: Zustand (템플릿/런 상태), React Query (호출/로그)
* **주요 화면 컴포넌트**

  * `<TemplateEditor/>`, `<SchemaForm/>`, `<CodePane/>`, `<PreviewRunner/>`, `<DiffViewer/>`

### 7-1) 라우팅 예시

```
/ (Dashboard)
/p/:projectId/templates
/p/:projectId/t/:templateId (Editor)
/p/:projectId/t/:templateId/runs (Runs)
/settings/secrets
/market (갤러리)
```

### 7-2) 상태 모델 (간단)

```ts
type Template = {
  id: string; name: string; description?: string; tags: string[];
  model: { provider: string; name: string; params?: Record<string, any> };
  input: Record<string, any>; render: any; tests?: any[];
  version: string; createdAt: string; updatedAt: string; ownerId: string;
}
```

## 8) 백엔드 설계

* **API 게이트웨이**: BFF (Next.js Route Handler or NestJS)
* **서비스**: Template, Run, Secret, Auth, Project, Evaluation
* **DB**: PostgreSQL (템플릿/버전/권한/로그), Redis(캐시/레이트리밋)
* **시크릿 보관**: KMS + at-rest 암호화, 사용 시 디크립트
* **실행 워커**: 큐 기반(Cloud Tasks/SQS/Redis Queue) — 동시성/타임아웃/재시도
* **감사로그**: 입력/출력 마스킹 규칙(PII, 시크릿)

### 8-1) REST API 초안

* `POST /api/templates` 생성
* `GET /api/templates/:id` 조회
* `PUT /api/templates/:id` 수정
* `POST /api/templates/:id/run` 실행
* `GET /api/templates/:id/runs` 실행 이력
* `POST /api/secrets` 키 저장
* `POST /api/evals/run` 평가 실행

### 8-2) RBAC

* Role: `owner`, `editor`, `viewer`
* 프로젝트 단위 초대/권한, 감사 로그에 모든 변경 기록

## 9) 보안/컴플라이언스

* 최소 권한 원칙(시크릿 분리 보관), 감사 로그, 데이터 마스킹
* 모델 호출 요청/응답 보존 기간 설정(옵트 인)
* BYOK(Bring Your Own Key) 및 고객 VPC 프록시 옵션(엔터프라이즈)

## 10) 가격 정책 초안

* **Free**: 개인 1 프로젝트, 템플릿 5개, 월 실행 200회
* **Pro**: 무제한 템플릿, 팀 협업, 월 실행 5k + 초과 종량제
* **Team/Enterprise**: SSO/SAML, VPC 프록시, 마켓 비공개 배포

## 11) 메트릭/로그

* 호출/성공률/토큰/비용/지연시간, 모델별 성능 비교
* 에러 사유(429, 5xx, 유효성 실패) 추적 대시보드

## 12) 거버넌스 & 평가 루프

* 템플릿 변경 시 **체인지 리퀘스트** → 리뷰/승인 후 배포
* 오프라인 **골드셋**과 자동 평가 스텝
* 프롬프트 안전 가드레일(금칙어, 안전 정책 체크 리스트)

## 13) 템플릿 매크로/스니펫 제안

* `{{ var }}` 치환, `{{#if}} {{/if}}` 조건, `{{#each}}` 반복
* 부분 템플릿(Partial)과 상속(Inheritance)로 중복 제거

## 14) SDK/CLI 설계 요약

* **SDK**: `@squarebrackets/sdk`

  * `loadTemplate(id)` / `runTemplate(id, vars)` / `compare(models, vars)`
* **CLI**: `sqb run -t product_copy_writer -v vars.json --out out.json`

## 15) 로드맵 (Q 분기 단위)

* **Q1 — MVP**: 템플릿 편집/검증/실행, OpenAI 어댑터, 버전/권한, 기본 대시보드
* **Q2 — 확장**: Anthropic/Google/DeepSeek, 마켓, 평가 루프, SDK/CLI
* **Q3 — 엔터프라이즈**: SSO/SAML, BYOK, VPC 프록시, 감사/컴플라이언스 강화

## 16) 경쟁/차별화 포인트

* 단순 프롬프트 에디터 대비 **정형 JSON 스키마 + 어댑터 레이어**로 **이식성** 극대화
* 팀 협업/리뷰/버저닝이 **기본 내장**
* **평가-배포-관측**까지 **엔드투엔드** 사이클 제공

## 17) 기술 PoC 체크리스트

* Monaco + JSON Schema 실검증 성능
* 어댑터 별 파라미터 변환 완성도(함수형 변환 테이블)
* 샌드박스 멀티 호출 동시성/쿼터/레이트리밋
* 시크릿 마스킹/키 회전

## 18) 도메인/브랜딩 메모

* 도메인: **squarebrackets.ai**
* 톤앤매너: 정밀, 구조적, 엔지니어 친화적
* UI 아이콘: `[]` 모티프 + 각진 타이포그래피

## 19) 성공 지표(KPI)

* 템플릿 활성 사용률(WAU/MAU 대비), 실행 성공률, 팀 협업 세션 수, 마켓 포크 수

## 20) 리스크 & 대응

* 모델 API 변경 → 어댑터 자동 테스트/버전 고정
* 개인정보 취급 → 옵트인 로깅, PII 마스킹, 리전 저장 옵션
* 비용 불확실성 → 상한선/쿼터, 사전 비용 추정기

---

### 부록 A) 폼-코드 동기 UI 예시 JSON

```json
{
  "fields": [
    {"path": "name", "widget": "text", "label": "Template Name"},
    {"path": "model.provider", "widget": "select", "options": ["openai","anthropic","google"]},
    {"path": "model.name", "widget": "model-select", "dependsOn": "model.provider"},
    {"path": "model.params.temperature", "widget": "slider", "min": 0, "max": 2, "step": 0.1},
    {"path": "input.tone.enum", "widget": "tags"}
  ]
}
```

### 부록 B) 평가 규칙 예시

```json
{
  "metrics": [
    {"name": "contains_keywords", "type": "rule", "keywords": ["친근", "가벼움"]},
    {"name": "length", "type": "range", "min": 100, "max": 300}
  ]
}
```

### 부록 C) Next.js Route Handler 예시 (템플릿 실행)

```ts
// app/api/templates/[id]/run/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTemplate, renderTemplate, runWithOpenAI } from '@/lib';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const template = await getTemplate(params.id);
  const rendered = renderTemplate(template, body.vars);
  const result = await runWithOpenAI({ apiKey: process.env.OPENAI_API_KEY! }, { template, vars: body.vars });
  return NextResponse.json({ rendered, result });
}
```

### 부록 D) 시크릿 설계 요약

* 키는 서버 전용 KMS로 암호화 저장, 클라이언트에 직접 노출 금지
* 실행 시 서버에서 주입(서버사이드 호출), 감사로그에 값 마스킹

### 부록 E) 데이터베이스 초안 (PostgreSQL)

```sql
CREATE TABLE projects (
  id uuid PRIMARY KEY, name text NOT NULL, owner_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now()
);
CREATE TABLE templates (
  id uuid PRIMARY KEY, project_id uuid REFERENCES projects(id),
  name text NOT NULL, description text, tags text[],
  model jsonb NOT NULL, input jsonb NOT NULL, render jsonb NOT NULL, tests jsonb,
  version text NOT NULL, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now(),
  owner_id uuid NOT NULL
);
CREATE TABLE runs (
  id uuid PRIMARY KEY, template_id uuid REFERENCES templates(id),
  vars jsonb NOT NULL, result jsonb, cost numeric, tokens int,
  status text, created_at timestamptz DEFAULT now()
);
```

### 부록 F) QA 체크리스트 (MVP 출고 전)

* JSON Schema 유효성 에러 UX
* 텍스트→JSON 변환(붙여넣기) 정확도
* 멀티 모델 비교표 정확성
* 레이트리밋/재시도/타임아웃 기본값
* 로그 마스킹/다운로드
