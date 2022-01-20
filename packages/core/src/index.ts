export const loader = (
  { onRequest, name }: PagesPlugin,
  pluginData?: Record<string, unknown>
): NewPagesFunction[] => [
  ({ data, next, functionPath }) => {
    data.plugins ||= {};
    data.plugins[name] = {
      basePath: functionPath,
      data: pluginData,
    };
    return next();
  },
  onRequest,
];
