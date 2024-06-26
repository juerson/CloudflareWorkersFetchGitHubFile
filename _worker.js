// src/index.js
var DEFAULT_GITHUB_TOKEN = "";
var DEFAULT_OWNER = "";
var DEFAULT_REPO = "";
var DEFAULT_BRANCH = "main";
var DEFAULT_FILE_PATH = "README.md";
var src_default = {
  async fetch(request, env, ctx) {
    const GITHUB_TOKEN = env.GITHUB_TOKEN || DEFAULT_GITHUB_TOKEN;
    const OWNER = env.GITHUB_OWNER || DEFAULT_OWNER;
    const REPO = env.GITHUB_REPO || DEFAULT_REPO;
    const BRANCH = env.GITHUB_BRANCH || DEFAULT_BRANCH;
    const FILE_PATH = env.GITHUB_FILE_PATH || DEFAULT_FILE_PATH;
    const url = new URL(request.url);
    let responseBody;
    if (url.pathname === "/fetch-github-file") {
      try {
        const fileContent = await fetchGitHubFile(GITHUB_TOKEN, OWNER, REPO, FILE_PATH, BRANCH);
        const decoder = new TextDecoder("utf-8");
        responseBody = decoder.decode(fileContent.body);
      } catch (error) {
        responseBody = "";
      }
    } else {
      responseBody = "";
    }
    return new Response(responseBody, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
      // 指定UTF-8编码
    });
  }
};
async function fetchGitHubFile(token, owner, repo, filePath, branch = "main") {
  const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  try {
    const response = await fetch(githubUrl, {
      method: "GET",
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3.raw",
        "User-Agent": "Cloudflare Worker"
      }
    });
    if (!response.ok) {
      return {
        body: "",
        contentType: "text/plain; charset=utf-8"
      };
    }
    const contentType = response.headers.get("Content-Type") || "application/octet-stream";
    const body = await response.arrayBuffer();
    return {
      body,
      contentType
    };
  } catch (error) {
    return {
      body: "",
      contentType: "text/plain; charset=utf-8"
    };
  }
}
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
