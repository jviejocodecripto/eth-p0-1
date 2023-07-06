# Creacion del nodo con docker
```
docker run \
     --rm \
     -v ${PWD}:/data ethereum/client-go account \
     new --password /data/password.txt --datadir /data/data

docker run \
   --rm \
   -v ${PWD}/data:/data \
   -v ${PWD}/genesis.json:/genesis.json \
   ethereum/client-go init \
   --datadir /data /genesis.json


Cambiar las address de unlock y miner.etherbase

docker run  -p 8545:8545 \
    --rm \
    -d \
    --name eth-node1 \
    -v ${PWD}/data:/data \
    -v ${PWD}/password.txt:/password.txt \
    ethereum/client-go \
    --nodiscover  \
    --allow-insecure-unlock \
    --datadir /data \
    --http \
    --http.api personal,admin,eth,net,web3 \
    --http.addr 0.0.0.0 \
    --http.port 8545 \
    --http.corsdomain="*" \
    --unlock 6f4094b7455e9df89022a2add93d979b56be1104 \
    --password /password.txt   \
    --mine \
    --miner.etherbase 6f4094b7455e9df89022a2add93d979b56be1104



compilar con la version 0.8.18

npx solc@0.8.18 -o out --bin --abi contador.sol

```    