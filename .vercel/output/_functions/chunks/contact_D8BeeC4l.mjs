const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, phone, email, message } = data;
    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const botToken = undefined                                  ;
    const chatId = undefined                                ;
    if (!botToken || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const lines = [
      `🔥 *Новая заявка с primedev.kz*`,
      ``,
      `👤 *Имя:* ${escapeMarkdown(name)}`,
      `📱 *Телефон:* ${escapeMarkdown(phone)}`
    ];
    if (email) {
      lines.push(`📧 *Email:* ${escapeMarkdown(email)}`);
    }
    if (message) {
      lines.push(``, `💬 *Сообщение:*`, escapeMarkdown(message));
    }
    const text = lines.join("\n");
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown"
        })
      }
    );
    if (!telegramRes.ok) {
      const err = await telegramRes.text();
      console.error("Telegram API error:", err);
      return new Response(JSON.stringify({ error: "Failed to send notification" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("Contact API error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
