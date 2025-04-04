const fs = require("fs"); //html 파일을 가져옴
const main_view = fs.readFileSync("./index.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

//db
const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  response.write(main_view);
  response.end();
}

function blueRacket(response) {
  fs.readFile("./assets/blue.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "image/png; charset=UTF-8" });
    response.write(data);
    response.end();
  });
}

function yellowRacket(response) {
  fs.readFile("./assets/yellow.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "image/png; charset=UTF-8" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./assets/black.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "image/png; charset=UTF-8" });
    response.write(data);
    response.end();
  });
}

function handleCSS(response) {
  fs.readFile("./main.css", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css; charset=UTF-8" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  fs.readFile("./orderlist.html", function (err, data) {});
  response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write(`${productId}번 상품 구매 완료. 감사합니다`);
  response.end();
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    response.write(orderlist_view);

    rows.forEach((element) => {
      response.write(
        "<tr>" +
          "<td>" +
          element.product_id +
          "</td>" +
          "<td>" +
          element.order_date +
          "</td>" +
          "</tr>"
      );
    });

    response.write("</table>");
    response.end();
  });
}

let handle = {}; //key:value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/*static*/
handle["/assets/blue.png"] = blueRacket;
handle["/assets/yellow.png"] = yellowRacket;
handle["/assets/black.png"] = blackRacket;
handle["/main.css"] = handleCSS;

exports.handle = handle;
