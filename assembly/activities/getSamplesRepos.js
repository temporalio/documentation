import { Octokit } from "@octokit/rest";
import fs from "fs-extra";
import path from "path";
import anzip from "anzip";
import arrayBufferToBuffer from "arraybuffer-to-buffer";

export async function getSamplesRepos(config) {
  console.log("downloading and unzipping documentation samples repos...");
  // Initialize Octokit with your personal access token
  const octokit = new Octokit();
  const samplesFilePaths = [];

  for (const item of config.documentation_samples_repos) {
      // Download the zip archive
      const owner = item.org;
      const repo = item.name;
      let ref = "main";
      if ((item.ref != undefined) && (item.ref != "")) {
        ref = item.ref;
      }
      const byteArray = await getArchive(owner, repo, ref);
      const fileName = `${repo}.zip`;
      const buffer = arrayBufferToBuffer(byteArray);
      const archiveWritePath = path.join(
        config.root_dir,
        config.temp_write_dir,
        config.temp_archive_dir,
        fileName,
      );
      await fs.writeFile(archiveWritePath, buffer);
      const unzipPath = path.join(
        config.root_dir,
        config.temp_write_dir,
      )
      const fileData = await anzip(archiveWritePath, { outputPath: unzipPath });
      await fs.unlink(archiveWritePath);
      const sourceURL = "https://github.com/" + path.join(
        owner,
        repo,
        "blob",
        ref,
      );
      console.log(sourceURL);
      samplesFilePaths.push({
        source_url: sourceURL,
        repo_files: fileData.files
      });
  }

  const writePath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.samples_file_paths_filename,
  );
  await fs.writeJSON(writePath, samplesFilePaths);
  
  async function getArchive(owner, repo, ref) {
    const result = await octokit.repos.downloadZipballArchive({
      owner,
      repo,
      ref,
    });
    return result.data;
  }
}
