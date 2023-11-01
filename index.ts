import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.json());

type Address = string;



let balances: { [address: Address]: number } = {};


let allowances: {
    [address: Address]: {
      [address: Address]: number;
    }
  } = {};
  
  app.post ('/create' , (req , res) =>{
    const {userId , initialBalance} = req.body;
    
    if (balances[userId]) {
        return res.status(400).send("Account already exist !");
    }
    balances[userId] = initialBalance
    res.send(`Account for ${userId}  created with balance : ${initialBalance}`);
  });
  
  
  app.post('/transfer' , (req , res) => {
    const {fromUserId , toUserId , amount} = req.body;
    
    if (!balances[fromUserId] || !balances[toUserId]){
        return res.status(400).send("Account does not exist !")
    }
    
    if(balances[fromUserId] < amount) {
        return res.status(400).send("Insufficient Balance !");
    }
    balances[fromUserId] -= amount;
    balances[toUserId] += amount;
    res.send(`Transfered ${amount} from ${fromUserId}  to the ${toUserId} successFully !` );
  });
  
  
app.post('/approve', (req, res) => {
    const { ownerId, spenderId, amount } = req.body;
    if (!balances[ownerId]) {
      return res.status(400).send("Account doesn't exist!");
    }
  
    if (!allowances[ownerId]) {
      allowances[ownerId] = {};
    }
  
    allowances[ownerId][spenderId] = amount;
    res.send(`${ownerId} has approved ${spenderId} to spend ${amount} tokens on their behalf.`);
  });
  

 