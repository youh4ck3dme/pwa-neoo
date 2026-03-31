
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function clearProjects() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Clearing projects table...');
  const { error } = await supabase.from('projects').delete().not('id', 'is', null);

  if (error) {
    console.error('Error clearing projects:', error);
  } else {
    console.log('Successfully cleared projects table.');
  }
}

clearProjects();
