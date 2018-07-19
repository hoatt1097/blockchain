const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const previousBlockHash = "JLHKJDAJKFJALFNF";
const currentBlockData = [
    {
        amount: 1023,
        sender: "AFJAFNLANFA",
        recipient: "JGSFNSKNGSGSF"
    },
    {
        amount: 414123,
        sender: "O:FNSLKV",
        recipient: "JGSFNSKNGSGSF"
    },
    {
        amount: 123123,
        sender: "WNOHVSNJSKLV",
        recipient: "JGSFNSKNGSGSF"
    }
];

const proofOfWork = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

console.log(proofOfWork);

