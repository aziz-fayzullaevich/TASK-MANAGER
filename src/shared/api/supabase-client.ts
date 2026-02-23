import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvtlqegjjcqiubbkchoa.supabase.co';
const supabaseKey = 'sb_publishable_TZ36HxVzUMEIuVXUDiiCiQ_lxxQV8zt';

export const supabase = createClient(supabaseUrl, supabaseKey);