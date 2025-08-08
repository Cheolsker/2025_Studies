const userController = require("../controllers/user.controller");
const chatController = require("../controllers/chat.controller");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("login", async (userName, cb) => {
      // 유저 정보 저장
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joined to this room.`,
          user: {
            id: null,
            name: "system",
          },
        };
        io.emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        console.log("/// 에러 ///");
        console.log(error);

        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        // socket id로 유저 찾기
        const user = await userController.checkUser(socket.id);

        // 메시지 저장
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);

        cb({
          ok: true,
        });
      } catch (error) {
        cb({
          ok: false,
          error: error.message,
        });
      }
    });

    socket.on("disconnect", async () => {
      try {
        const user = await userController.checkUser(socket.id);
        console.log("User disconnected", socket.id);

        const leftMessage = {
          chat: `${user.name} has left this room.`,
          user: {
            id: null,
            name: "system",
          },
        };
        io.emit("message", leftMessage);
      } catch (error) {
        console.error("Error during disconnection:", error);
      }
    });
  });
};
