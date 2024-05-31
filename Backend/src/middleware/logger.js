const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const morganConfig = {
    format: ':method :url :status :res[content-length] :response-time ms :date[web]\n',
    stream: accessLogStream
};

module.exports = { morganConfig };
