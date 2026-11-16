# Telegram bot (webhook)

Bot ikki ish qiladi:

1. Saytdagi kontakt/buyurtma formalaridan kelgan xabarlarni sizga yuboradi (`src/app/api/send/route.ts`).
2. Odamlar botga yozsa, xabar sizga keladi, siz **Reply** qilsangiz, javob ularga qaytadi (`src/app/api/telegram/webhook/route.ts`).

## Kerakli o'zgaruvchilar

| O'zgaruvchi | Qiymat |
|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather bergan token |
| `TELEGRAM_CHAT_ID` | Sizning chat ID'ingiz (admin) |
| `TELEGRAM_WEBHOOK_SECRET` | O'zingiz o'ylab topgan maxfiy so'z, masalan `hc_7fK29xLq_bot2026` (faqat `A-Z a-z 0-9 _ -`) |

Uchalasini ham Netlify → Site configuration → Environment variables ga qo'shing va qayta deploy qiling.

## Webhookni ulash (bir marta)

Deploy tugagach, brauzerda oching (`TOKEN` va `SECRET` ni o'zingiznikiga almashtiring, `<` `>` belgilarsiz):

```
https://api.telegram.org/botTOKEN/setWebhook?url=https://husanbek-coder.uz/api/telegram/webhook&secret_token=SECRET&allowed_updates=["message"]
```

Javob `{"ok":true,"result":true,"description":"Webhook was set"}` bo'lishi kerak.

Tekshirish:

```
https://api.telegram.org/botTOKEN/getWebhookInfo
```

`last_error_message` bo'lmasa — hammasi joyida.

> Webhook ulangach, `getUpdates` endi ishlamaydi — bu normal.
> Tokenni `/revoke` bilan almashtirsangiz, webhookni yangi token bilan qayta ulang.

## Foydalanish

- Kimdir botga yozsa, sizga `#id123456789` belgili xabar keladi.
- Javob berish: shu xabarni bosib **Reply** qiling va yozing (matn, rasm, fayl, ovozli xabar — hammasi ishlaydi).
- Javob yetib borsa, xabaringizga 👍 reaksiya qo'yiladi.
