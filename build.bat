call npm install --ignore-scripts 
call node .prebuild\build.js 
call npx prebuild -t 10.0.0 -t 11.0.0 -t 12.0.0 -t 13.0.0 -t 14.0.0 -t 15.0.0 --include-regex \"\.(node|exe|dll|pdb)$\" 
call npx prebuild -t 10.0.0 -t 11.0.0 -t 12.0.0 -t 13.0.0 -t 14.0.0 -t 15.0.0 --include-regex \"\.(node|exe|dll|pdb)$\" -a ia32 
call npx prebuild -t 5.0.0 -t 6.0.0 -t 7.0.0 -t 8.0.0 -t 9.0.0 -t 10.0.0 -t 11.0.0 --include-regex \"\.(node|exe|dll|pdb)$\" -r electron 
call npx prebuild -t 5.0.0 -t 6.0.0 -t 7.0.0 -t 8.0.0 -t 9.0.0 -t 10.0.0 -t 11.0.0 --include-regex \"\.(node|exe|dll|pdb)$\" -r electron -a ia32 