import { createCanvas } from '@napi-rs/canvas';

export default async function handler(req, res) {
  const { server = "hypixel.net" } = req.query;

  try {
    const r = await fetch(`https://api.mcsrvstat.us/2/${server}`);
    const data = await r.json();

    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = '24px sans-serif';
    ctx.fillText(server, 20, 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = '18px sans-serif';

    const motd = data.motd?.clean || [];
    ctx.fillText(motd[0] || 'Server MOTD', 20, 90);
    ctx.fillText(motd[1] || '', 20, 120);

    ctx.fillStyle = '#ffaa00';
    ctx.fillText(
      `${data.players?.online || 0}/${data.players?.max || 0} players`,
      20,
      160
    );

    const buffer = canvas.toBuffer('image/png');

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (e) {
    res.status(500).json({ error: 'Image generation failed' });
  }
}
