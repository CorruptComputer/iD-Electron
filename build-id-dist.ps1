git clone --depth 1 --branch v2.21.1 https://github.com/openstreetmap/iD

Remove-Item dist/ -Recurse
Remove-Item out/ -Recurse

cd iD
npm install
npm run all

Move-Item ./dist ../dist

cd ..
Remove-Item ./iD -Recurse