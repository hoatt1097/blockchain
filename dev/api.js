const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain();


app.get('/blockchain', function(req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function(req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({Note: `Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', function(req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const currentBlockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "TRAN THIEN HOA", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, currentBlockHash);
    res.json({
        Note: "New block mined successfully",
        block: newBlock
    })
});

app.listen(3000, function(){
    console.log("Server is running on port 3000....")
});