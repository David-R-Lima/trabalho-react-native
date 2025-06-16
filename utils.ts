import * as SQLite from 'expo-sqlite'
import { ViaCep } from './services/viacep/types'

let db: SQLite.SQLiteDatabase | null = null

export async function openDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('mydatabase.db')
  }
  return db
}

export async function setupDatabase() {
  const db = await openDb()
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS cep_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cep TEXT,
      logradouro TEXT,
      complemento TEXT,
      unidade TEXT,
      bairro TEXT,
      localidade TEXT,
      uf TEXT,
      estado TEXT,
      regiao TEXT,
      ibge TEXT,
      gia TEXT,
      ddd TEXT,
      siafi TEXT
    );
  `)
}

export async function saveCep(data: ViaCep) {
  const db = await openDb()
  try {
    const result = await db.runAsync(
      `INSERT INTO cep_data (
        cep, logradouro, complemento, unidade, bairro, localidade,
        uf, estado, regiao, ibge, gia, ddd, siafi
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      data.cep,
      data.logradouro,
      data.complemento,
      data.unidade,
      data.bairro,
      data.localidade,
      data.uf,
      data.estado,
      data.regiao,
      data.ibge,
      data.gia,
      data.ddd,
      data.siafi
    )
    return { success: true, id: result.lastInsertRowId }
  } catch (error: any) {
    console.error('Error saving CEP:', error)
    return { success: false, message: error.message }
  }
}

export async function fetchAllCeps(): Promise<ViaCep[]> {
  const db = await openDb()
  try {
    const rows = await db.getAllAsync<ViaCep>('SELECT * FROM cep_data ORDER BY id DESC')
    // Remove id field to return ViaCep shape exactly (optional)
    return rows
  } catch (error) {
    console.error('Error fetching CEPs:', error)
    return []
  }
}
