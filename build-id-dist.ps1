git clone --depth 1 --branch v2.21.1 https://github.com/openstreetmap/iD

Remove-Item -Recurse -Force -ErrorAction SilentlyContinue -Confirm:$false -Path dist/
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue -Confirm:$false -Path out/

cd iD
npm install
npm run all

Move-Item ./dist ../dist

cd ..
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue -Confirm:$false -Path iD/