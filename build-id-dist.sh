git clone --depth 1 --branch v2.21.1 https://github.com/openstreetmap/iD

rm -rf dist/
rm -rf out/

cd iD
npm install
npm run all

mv ./dist ../dist

cd ..
rm -rf ./iD