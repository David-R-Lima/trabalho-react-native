import { setupDatabase } from '@/utils';
import { useEffect } from 'react';

export function SetupDatabase() {
  useEffect(() => {
    setupDatabase()
      .then(() => console.log('Database ready ✅'))
      .catch(err => console.error('DB error:', err));
  }, []);

  return <></>
}
