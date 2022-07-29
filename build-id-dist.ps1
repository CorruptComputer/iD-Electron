# Build iD
git clone --depth 1 --branch v2.21.1 https://github.com/openstreetmap/iD

Remove-Item -Recurse -Force -ErrorAction SilentlyContinue -Confirm:$false -Path dist/
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue -Confirm:$false -Path out/

cd iD
npm install
npm run all

Move-Item ./dist ../dist

cd ..
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue -Confirm:$false -Path iD/

# Replace with new client info
$index = Get-Content -Path ./dist/index.html -Raw

$index = $index -Replace '0tmNTmd0Jo1dQp4AUmMBLtGiD9YpMuXzHefitcuVStc','CNqvIJYEb3XcnTXbFOUwdi6a_o3-o5x4n72Ql4SOv2w'
$index = $index -Replace 'BTlNrNxIPitHdL4sP2clHw5KLoee9aKkA7dQbc0Bj7Q','KKmWhMqYypqD1wlCSkitaLe20PessciNQ3RDT1Qt4Eg'

$index | Set-Content -Path ./dist/index.html