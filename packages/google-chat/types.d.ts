import type { chat_v1 } from "@googleapis/chat";

export type PluginArgs = (
  event: chat_v1.Schema$DeprecatedEvent
) => Promise<chat_v1.Schema$Message | undefined>;

export type GoogleChatPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = PagesPluginFunction<Env, Params, Data, PluginArgs>;
