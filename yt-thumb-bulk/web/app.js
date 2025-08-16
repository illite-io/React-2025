const API = (path) => `http://localhost:8080${path}`;

const logEl = document.getElementById("log");
function log(s) {
  logEl.textContent += s + "\n";
  logEl.scrollTop = logEl.scrollHeight;
}

document.getElementById("start").onclick = async () => {
  const url = document.getElementById("url").value.trim();
  const count = Number(document.getElementById("count").value);
  const apiKey = document.getElementById("apiKey").value.trim();

  if (!url || !apiKey) { alert("URL과 API Key를 입력하세요"); return; }

  const res = await fetch(API("/api/collect"), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({ url, count })
  });
  const j = await res.json();
  if (!res.ok) { alert(j.error || "오류"); return; }

  const { taskId } = j;
  log(`taskId=${taskId}`);

  const es = new EventSource(API(`/api/progress/${taskId}`), { withCredentials: false });
  const statusEl = document.getElementById("status");
  const progEl = document.getElementById("prog");

  es.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    log(JSON.stringify(data));
    if (data.stage === "meta") {
      statusEl.textContent = `총 ${data.total}개 준비`;
      progEl.value = 1;
    } else if (data.stage === "downloading") {
      const pct = Math.floor((data.done / data.total) * 100);
      statusEl.textContent = `${data.done}/${data.total}`;
      progEl.value = pct;
    } else if (data.stage === "done") {
      statusEl.innerHTML = `<a href="${data.downloadUrl}" target="_blank" rel="noopener">ZIP 다운로드</a>`;
      progEl.value = 100;
      es.close();
    } else if (data.stage === "error") {
      statusEl.textContent = `오류: ${data.message}`;
      es.close();
    }
  };
};