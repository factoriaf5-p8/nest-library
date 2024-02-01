import { registerAs } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default registerAs('database', () => {
  const connectionOption: MysqlConnectionOptions = {
    type: 'mysql',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'library',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  };
  return connectionOption;
});
