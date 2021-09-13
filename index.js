const express = require('express');
const morgan = require('morgan');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const fintoc = require('fintoc')


const log = console.log;
const app = express();
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.render('pages/index');
})

const Authorization = keys.SECRET_KEY;

const client = new fintoc(`${Authorization}`);

app.post('/get_accounts', (req,res) => {
    try {
        const response = client.getLink('link_MjplGZ1ixoAX50Kq_token_yBq6ytUXPRxzzZ3C7s2Vtxk4')
                .then((link) => {
                    link.accounts.forEach((accounts) => {
                        log(accounts);
                    });
                });
                res.header('Authorization', 'sk_test_3RVz9Vdi7Phxz2CnNjbtM4mos9ckctAf')
                    .json({'status' : 'approved'});
    } catch (err) {
        res.json({'status': err.message})
    }
})

app.post('/get_transactions', (req,res) => {
    const response = client.getLink('link_MjplGZ1ixoAX50Kq_token_yBq6ytUXPRxzzZ3C7s2Vtxk4')
                            .then((link) => link.find({ type_: 'checking_account' }))
                            .then((account) => {
                              const yesterday = new Date();
                              yesterday.setDate(yesterday.getDate() - 1);
                              return account.getMovements({ since: yesterday });
                            })
                            .then(log)
                            .catch(log);
})

app.listen(3000, () => log('Run server on port 3000'));