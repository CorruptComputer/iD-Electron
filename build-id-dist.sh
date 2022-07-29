git clone --depth 1 --branch v2.21.1 https://github.com/openstreetmap/iD

cd iD
npm install
npm run all

mv ./dist ../dist

cd ..
rm -rf ./iD