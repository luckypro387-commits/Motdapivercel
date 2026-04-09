# mc-motd-api

A Vercel Edge API that generates a Minecraft server-list style MOTD image (PNG) from a live server status.

## Endpoint

```
GET /api/motd?server=<address>
```

Returns `image/png` (860×80 px).

### Parameters

| Param    | Required | Example              |
|----------|----------|----------------------|
| `server` | ✅        | `hypixel.net`        |
|          |          | `play.kingdomog.fun` |
|          |          | `mc.example.com:25565` |

### Example URLs

```
https://your-deployment.vercel.app/api/motd?server=hypixel.net
https://your-deployment.vercel.app/api/motd?server=play.kingdomog.fun
```

---

## Deploy

```bash
npm install
npx vercel --prod
```
