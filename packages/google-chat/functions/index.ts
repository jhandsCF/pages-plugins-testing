import { KJUR } from "jsrsasign";
import type { chat_v1 } from "@googleapis/chat";

const extractJWTFromRequest = (request: Request) => {
  return request.headers.get("Authorization").split("Bearer ")[1];
};

const isAuthorized = async (request: Request) => {
  const jwt = extractJWTFromRequest(request);

  const { kid } = KJUR.jws.JWS.parse(jwt)
    .headerObj as KJUR.jws.JWS.JWSResult["headerObj"] & { kid: string };

  const keysResponse = await fetch(
    "https://www.googleapis.com/service_accounts/v1/metadata/x509/chat@system.gserviceaccount.com"
  );
  const keys = (await keysResponse.json()) as Record<string, string>;
  const cert = Object.entries(keys).find(([id, cert]) => id === kid)[1];

  return KJUR.jws.JWS.verifyJWT(jwt, cert, { alg: ["RS256"] });
};

export const onRequestPost: PagesPluginFunction<
  unknown,
  any,
  Record<string, unknown>,
  (
    message: chat_v1.Schema$Message
  ) => Promise<chat_v1.Schema$Message | undefined>
> = async ({ request, pluginArgs }) => {
  if (!(await isAuthorized(request))) {
    return new Response(null, { status: 403 });
  }

  const response = await pluginArgs(await request.json());

  if (response !== undefined) {
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null);
};
