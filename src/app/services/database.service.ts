import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.initDB();
  }

  async initDB() {
    try {
      const dbName = 'miagenda.db';
      const ret = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection(dbName, false)).result;
      if (isConn) {
        this.db = await this.sqlite.retrieveConnection(dbName, false);
      } else {
        this.db = await this.sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
      }
      await this.db.open();
      await this.createTables();
    } catch (err) {
      console.error('Error al iniciar la base de datos:', err);
    }
  }

  async createTables() {
    if (!this.db) return;
    const query = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        usuario TEXT NOT NULL,
        clave TEXT NOT NULL
      );
    `;
    await this.db.execute(query);
  }

  async agregarUsuario(usuario: string, clave: string): Promise<void> {
    if (!this.db) return;
    const query = 'INSERT INTO usuarios (usuario, clave) VALUES (?, ?)';
    await this.db.run(query, [usuario, clave]);
  }

  async obtenerUsuario(usuario: string, clave: string): Promise<any> {
    if (!this.db) return null;
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND clave = ?';
    const result = await this.db.query(query, [usuario, clave]);
    return result.values?.[0] || null;
  }

  async obtenerUsuarioPorNombre(usuario: string): Promise<any> {
    if (!this.db) return null;
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    const result = await this.db.query(query, [usuario]);
    return result.values?.[0] || null;
  }
}
