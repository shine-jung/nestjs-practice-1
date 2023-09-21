import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.local' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'postgres',
  // 빌드 시 js로 변환 후 실행되므로 js 파일도 포함
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  // 적용된 migration을 기록할 테이블명
  migrationsTableName: 'migrations',
});
