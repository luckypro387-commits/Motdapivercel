import { createCanvas } from '@napi-rs/canvas';

export default async function handler(req, res) {
  const { server = 'hypixel.net' } = req.query;

  const r = await fetch(`https://api.mcstatus.io/v2/status/java/${server}`);
  const data = await r.json();

  const canvas = createCanvas(960,128);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle='#111';
  ctx.fillRect(0,0,960,128);

  ctx.fillStyle='#fff';
  ctx.font='20px sans-serif';
  ctx.fillText(server,140,40);

  const motd = data.motd?.clean || [];

  ctx.font='18px sans-serif';
  ctx.fillText(motd[0]||'',140,70);
  ctx.fillText(motd[1]||'',140,95);

  ctx.fillStyle='#55FF55';
  ctx.fillText(`${data.players?.online||0}/${data.players?.max||0}`,800,40);

  const buffer = canvas.toBuffer('image/png');

  res.setHeader('Content-Type','image/png');
  res.send(buffer);
}
