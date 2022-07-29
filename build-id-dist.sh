# Build iD
git clone --depth 1 --branch v2.21.1 https://github.com/openstreetmap/iD

rm -rf dist/
rm -rf out/

cd iD
npm install
npm run all

mv ./dist ../dist

cd ..
rm -rf ./iD

# Replace with new client info
sed -i 's/0tmNTmd0Jo1dQp4AUmMBLtGiD9YpMuXzHefitcuVStc/CNqvIJYEb3XcnTXbFOUwdi6a_o3-o5x4n72Ql4SOv2w/g' ./dist/index.html
sed -i 's/BTlNrNxIPitHdL4sP2clHw5KLoee9aKkA7dQbc0Bj7Q/KKmWhMqYypqD1wlCSkitaLe20PessciNQ3RDT1Qt4Eg/g' ./dist/index.html