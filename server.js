const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html; charset=utf8");
        res.setHeader("Content-Length", 10);
        res.setHeader("Transfer-Encoding", "chunked");
        res.write("<p>111</p>");
        setTimeout(() => {
            res.write("第一次传输</br>");
        }, 1000);
        setTimeout(() => {
            res.write("第二次传输</br>");
            res.end();
        }, 2000);
    }
})

server.listen(8081, () => {
    console.log("启动成功")
})