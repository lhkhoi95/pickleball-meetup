export default () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
});
