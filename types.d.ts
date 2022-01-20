declare type PagesPlugin = {
  onRequest: PagesFunction;
  name: string;
  assetsDirectory?: string;
};

declare type PagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = (
  context: EventContext<Env, Params, Data> & {
    _next: EventContext<Env, Params, Data>["next"];
  }
) => ReturnType<PagesFunction<Env, Params, Data>>;

declare type NewPagesFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = (
  context: EventContext<Env, Params, Data> & { functionPath: string }
) => ReturnType<PagesFunction<Env, Params, Data>>;
