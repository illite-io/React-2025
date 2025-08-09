다음 문장은 백엔드 개발 맥락(보통 Java/Spring)에서 나오는 ‘투덜거림+비꼼’에 가깝습니다.

# 문장 쪼개서 해석

1. “DTO 안 쓰고 Map 쓰네”

* 관찰 + 불만: 요청/응답, 계층 간 데이터 전달에 **DTO(자료 전달 객체)** 대신 **Map\<String, Object>** 같은 범용 키-값 컨테이너를 쓴다는 뜻입니다.
* 뉘앙스: “타입·스키마를 명확히 안 잡고 대충 키-값으로 때우네?” 라는 품평.

2. “SI 가고 싶음”

* 한국 개발 문화 맥락의 비유/풍자: **SI(System Integration)** 프로젝트는 납기 위주로 빨리 붙이는 문화가 강해 **타입 안정성·도메인 모델링보다 ‘빨리 되게 하는’ 코드**가 흔하다는 인식이 있습니다.
* 실제 뜻: “이런 식(=Map 남용) 보면 SI식 개발 같다”, “그럴 거면 SI 가서 그렇게 해라” 혹은 “이 프로젝트가 SI 분위기네”라는 **비꼬는 표현**입니다. 실제로 SI에 가고 싶다는 소망이 아니라, **품질 기준이 낮아 보인다**는 비판.

# 왜 이런 반응이 나올까 (DTO vs Map)

* **타입 안정성 상실**: DTO는 컴파일 타임에 필드 검증·리팩터링 추적이 되지만, Map은 런타임에 키 오타/형변환 오류가 납니다.
* **명세/문서화 약함**: DTO는 Swagger/OpenAPI 스키마가 깔끔히 나오지만, Map은 “아무 키나 올 수 있음”이 되어 계약이 흐려집니다.
* **검증/유효성 처리 분산**: DTO는 Bean Validation(@NotNull 등)로 중앙화가 쉬운데, Map은 컨트롤러/서비스 곳곳에 if/캐스팅이 흩어집니다.
* **리팩터링 내성 낮음**: 필드명 변경 시 DTO는 컴파일 에러로 즉시 잡히지만, Map은 숨어 있다가 운영에서 폭발합니다.
* **도메인 모델링 약화**: 핵심 개념이 타입으로 드러나지 않아 협업·온보딩 난이도가 올라갑니다.

# 그래도 Map이 쓸모가 있는 경우(예외)

* **매우 동적인 필터/검색 파라미터**(필드 구성이 런타임에 바뀌는 케이스). 그래도 가능하면 Query DTO나 스펙/빌더 패턴을 고려.
* **로그 컨텍스트, 태그 메타데이터**처럼 진짜로 자유도가 필요한 부가 데이터.
* **프로토타이핑/스파이크** 단계의 임시 코드(단, 나중에 DTO로 정리).

# 짧은 예시

```java
// 나쁜 예(취약)
@PostMapping("/users")
public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
    String name = (String) body.get("name"); // 오타/누락/타입 오류 런타임 폭탄
    // ...
}

// 권장 예
public record CreateUserReq(
    @NotBlank String name,
    @Email String email
) {}

@PostMapping("/users")
public ResponseEntity<?> create(@Valid @RequestBody CreateUserReq req) {
    // req.name(), req.email() -> 타입 안전, 문서화/검증 용이
}
```

# 한 줄 정리

“DTO를 안 쓰고 Map을 남발하는 코드를 보니, 품질보다 빠른 납기·땜질을 우선하는 **SI식 개발 문화**가 떠오른다(=비꼬는 불만)”라는 의미입니다.
