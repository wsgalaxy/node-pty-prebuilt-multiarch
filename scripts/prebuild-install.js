const fs = require('fs');
const path = require('path');
const download = require('download');
const decompress = require('decompress');

function buildDownloadUrls(config, pkg)
{
  let res = [];
  const urls = [];

  for (const runtime of config.runtime) {
    for (const abi of config.abi) {
      for (const platform of config.platform) {
        for (const libc of config.libc) {
          for (const arch of config.arch) {
            const url = `${runtime}-v${abi}-${platform}${libc}-${arch}`;
            if (url in config.exclude) {
              continue;
            }
            res.push(url);
          }
        }
      }
    }
  }
  res = res.concat(config.include);

  for (const r of res) {
    const full = `${config.url}v${pkg.version}/${pkg.name}-v${pkg.version}-${r}.tar.gz`;
    console.debug('get url: ' + full);
    urls.push([full, r]);
  }

  return urls;
}

async function downloadPrebuild(url, dest)
{
  await download(url, dest);
}

async function extractPrebuild(file, destDir)
{
  await decompress(file, destDir);
}

// urls: [string, string][]
async function installPrebuild(urls)
{
  for (const url of urls) {
    const cache = path.join(__dirname, '../.cache', path.basename(url[0]));
    if (fs.existsSync(cache)) {
      console.log('found cache file ' + cache);
    } else {
      console.log('downloading ' + url[0] + ' to ' + path.dirname(cache));
      try {
        await downloadPrebuild(url[0], path.dirname(cache));
      } catch (e) {
        console.log(`failed to download ${url[0]}: ` + e.message);
        continue;
      }
    }
    const extractDir = path.join(__dirname, '../prebuilds', url[1]);
    if (!fs.existsSync(extractDir)) {
      fs.mkdirSync(extractDir);
    }
    console.log(`extracting ${cache} to ${extractDir}`);
    try {
      await extractPrebuild(cache, extractDir);
    } catch (e) {
      console.log(`failed to extract ${cache} to ${extractDir}: ` + e.message);
      continue;
    }
  }
}

(async () => {
  const bundleConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../prebuild_bundle.json')).toString());
  const pkg = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json')).toString());
  console.log(bundleConfig);
  console.log(pkg);
  const urls = buildDownloadUrls(bundleConfig, pkg);
  await installPrebuild(urls);
})()
