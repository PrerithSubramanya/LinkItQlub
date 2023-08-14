import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPA_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPA_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchTableData = async (userId) => {
    let { data, error } = await supabase
    .rpc('get_tables_for_user', { user_id : userId });

  if (error) {
    console.log("Data fetching error: ", error);
    return [];
  } else {
    return data;
  }
};