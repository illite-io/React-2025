# 1~100번 타이틀 포함 파일명으로 각각 md 파일 생성

# 디렉토리 생성
final_titles_dir = "/mnt/data/react-router-dom-100제-타이틀파일명-md"
os.makedirs(final_titles_dir, exist_ok=True)

# 실제 타이틀 정의 (1~10번 실제 예제 타이틀, 11~100번은 패턴)
titles = {
    1: "React Router DOM 설치 방법",
    2: "BrowserRouter 설정하기",
    3: "Routes와 Route 기본 사용법",
    4: "Link 컴포넌트로 페이지 이동하기",
    5: "useNavigate 훅으로 프로그래밍 방식 이동",
    6: "useParams로 URL 파라미터 받기",
    7: "중첩 라우팅 구현하기",
    8: "Outlet을 사용한 중첩 라우팅 렌더링",
    9: "useLocation으로 현재 경로 정보 가져오기",
    10: "Navigate로 조건부 리디렉션 처리",
}

for i in range(11, 101):
    titles[i] = f"React Router DOM 예제 {i}"

# 각 타이틀을 파일명에 적용한 md 파일 생성
for i in range(1, 101):
    title = titles[i]
    safe_title = title.replace("/", "-").replace(" ", "_")
    file_name = f"{i:03}.{safe_title}.md"
    file_path = os.path.join(final_titles_dir, file_name)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(f"# {i:03}. {title}\n")

# 압축
zip_path_final = "/mnt/data/react-router-dom-100제-타이틀파일명-md.zip"
with zipfile.ZipFile(zip_path_final, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, _, files in os.walk(final_titles_dir):
        for file in files:
            full_path = os.path.join(root, file)
            arcname = os.path.relpath(full_path, final_titles_dir)
            zipf.write(full_path, arcname)

zip_path_final
