import { NextRequest, NextResponse } from "next/server";

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

let _accessToken: string;
let _expiresAt: Date;

const authenticate = async () => {
  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET)
    throw new Error("Twitch creds are not set");
  if (!_accessToken || new Date() > _expiresAt) {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );
    const creds = await res.json();
    _accessToken = creds.access_token;
    _expiresAt = new Date(
      new Date().setSeconds(new Date().getSeconds() + creds.expires_in)
    );
  }
  return {
    twitchClientId: TWITCH_CLIENT_ID,
    accessToken: _accessToken,
    expiresAt: _expiresAt,
  };
};

export async function POST(req: NextRequest) {
  const { endpoint, query } = await req.json();
  const { twitchClientId, accessToken } = await authenticate();
  const res = await fetch(`https://api.igdb.com/v4${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": twitchClientId,
      Authorization: `Bearer ${accessToken}`,
    },
    body: query,
  });
  const json = await res.json();
  const headers = res.headers;
  return NextResponse.json({
    headers: Object.fromEntries(headers.entries()),
    body: json,
  });
}
