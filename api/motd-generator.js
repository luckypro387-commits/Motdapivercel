export default async function handler(req, res) {
  const { server = "mc.hypixel.net" } = req.query;

  try {
    const r = await fetch(`https://api.mcsrvstat.us/2/${server}`);
    const data = await r.json();

    res.status(200).json({
      server,
      online: data.online,
      players: data.players?.online || 0,
      maxPlayers: data.players?.max || 0,
      motd: data.motd?.clean || []
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch server" });
  }
}
