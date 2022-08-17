const express = require("express"); //웹서버
const http = require("http"); // node 내장 module
const path = require("path"); // node 내장 module, 서버가 구동되는 폴더의 절대결로 알려주는 모듈
const app = express();
const moment = require("moment");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server); // 여기서 클라이언트로 데이터 내려줌
app.use(express.static(path.join(__dirname, "/public"))); //정적 파일 서비스하는 폴더 지정
app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

io.on("connection", (socket) => {
  console.log("클라이언트 연결 되었습니다.");
  // socket.on("yaho", (data) => {
  //   console.log(data);
  //   io.emit("yaho", "나는 클라이언트가 yaho로 보낸 이벤트를 받아서 다시 yaho로 서버가 다시 yaho로 이벤트를 발송하는 것입니다. ");
  // });
  socket.on("chatting", (data) => {
    console.log(data);
    const sendTime = moment(new Date()).format("A hh:mm");
    io.emit("chatting", { nickName: data.nickName, msg: data.msg, time: sendTime });
  });
});

app.get("/", (req, res) => {
  // res.send("hello node:)");
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});
app.get("/chatting", (req, res) => {
  // res.send("채팅방");
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});
server.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
