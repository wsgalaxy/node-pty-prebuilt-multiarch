import * as fs from 'fs';
import * as path from 'path';

const tags = [];
tags.push(process.versions.hasOwnProperty('electron') ? 'electron' : 'node');
tags.push('v' + process.versions.modules);
// TODO: support musl
tags.push(process.platform);
tags.push(process.arch);
// Something like 'prebuild/node-v85-win32-x64/build/Release'
const prebuildBaseDir = path.join(__dirname, '../prebuilds', tags.join('-'), 'build/Release');

const ptyPathTmp = path.join(prebuildBaseDir, 'pty.node');
const conPtyPathTmp = path.join(prebuildBaseDir, 'conpty.node');
const conptyConsoleListPathTmp = path.join(prebuildBaseDir, 'conpty_console_list.node');

console.log('ptyPath:' + ptyPathTmp);
console.log('conPtyPath:' + conPtyPathTmp);
console.log('conptyConsoleListPath:' + conptyConsoleListPathTmp);

export const ptyPath = fs.existsSync(ptyPathTmp) ? ptyPathTmp : null;
export const conPtyPath = fs.existsSync(conPtyPathTmp) ? conPtyPathTmp : null;
export const conptyConsoleListPath =
  fs.existsSync(conptyConsoleListPathTmp) ? conptyConsoleListPathTmp : null;
