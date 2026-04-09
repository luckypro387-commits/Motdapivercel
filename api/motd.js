import { createCanvas, loadImage } from '@napi-rs/canvas'

export default async function handler(req, res) {
  try {
    const { server = 'hypixel.net' } = req.query

    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${server}`)
    const data = await response.json()

    const canvas = createCanvas(860, 80)
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#1e1e1e'
    ctx.fillRect(0, 0, 860, 80)

    // Server Name
    ctx.fillStyle = '#ffffff'
    ctx.font = '20px sans-serif'
    ctx.fillText(server, 90, 30)

    // MOTD
    ctx.fillStyle = '#aaaaaa'
    ctx.font = '16px sans-serif'
    const motd = data.motd?.clean?.join(' ') || 'Server offline'
    ctx.fillText(motd, 90, 55)

    // Players
    ctx.fillStyle = '#55ff55'
    ctx.font = '14px sans-serif'
    const players = `${data.players?.online || 0}/${data.players?.max || 0}`
    ctx.fillText(players, 750, 30)

    res.setHeader('Content-Type', 'image/png')
    res.send(canvas.toBuffer('image/png'))
  } catch (error) {
    res.status(500).send('Error generating MOTD')
  }
}
