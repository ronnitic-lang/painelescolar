import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { login, senha } = req.body;

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('login', login)
    .single();

  if (error || !data || data.senha !== senha) {
    return res.status(401).json({ ok: false });
  }

  return res.status(200).json({
    ok: true,
    redirect: data.redirect
  });
}
