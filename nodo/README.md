docker run \
     -v ${PWD}:/data ethereum/client-go account 
     new --password /data/password.txt --datadir /data/data



docker run \
   --rm \
   -v ${PWD}/data:/data \
   -v ${PWD}/genesis.json:/genesis.json \
   ethereum/client-go init \
   --datadir /data /genesis.json



docker run  -p 8545:8545 \
    --rm \
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
    --unlock d536462d23cda419768337b4fa96ebcf402fa347 \
    --password /password.txt   \
    --mine \
    --miner.etherbase d536462d23cda419768337b4fa96ebcf402fa347