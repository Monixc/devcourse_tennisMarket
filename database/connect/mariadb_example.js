const mariadb = require("mysql"); //모듈 임포트

const conn = mariadb.createConnection({
  host: "localhost",
  port: 3306,
  user: "", //유저
  password: "", //비밀번호
  database: "", //테이블명
});

module.exports = conn;
