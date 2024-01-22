import { registerAs } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default registerAs('database', () => {
  const connectionOption: MysqlConnectionOptions = {
    type: 'mysql',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
 }
  return connectionOption;
});
