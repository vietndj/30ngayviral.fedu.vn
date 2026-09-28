const botToken = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c";
const chatId = "2050406425";
const email = "test@example.com";
const payload = {
  chat_id: chatId,
  text: "Test payment",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Duyệt Skool", callback_data: `invite:${email}` },
        { text: "Copy Email", copy_text: { text: email } }
      ]
    ]
  }
};
fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
}).then(r => r.json()).then(console.log).catch(console.error);
