
import { CRON_SECRET } from '@/lib/constants'; 

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if(secret !== CRON_SECRET) return Response.error()

  const f = await fetch("https://nu2xr6x33m-dsn.algolia.net/1/indexes/blog/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.23.3)%3B%20Browser%20(lite)&x-algolia-api-key=70c52a984b97e6610de6f0da37f0b08a&x-algolia-application-id=NU2XR6X33M", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://blog.jujiyangasli.com/"
    },
    "body": "{\"query\":\"css\",\"hitsPerPage\":5}",
    "method": "POST"
  });

  const resp = await f.json();
  return Response.json({ ok: resp.hits.length > 0, data: resp.hits });  

}
