import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: ' ',
    database: 'cv-bank',
    migrationsTableName: "custom_migration_table",
});

export const databaseInit = async () => {
    try {
        await AppDataSource.initialize();
        console.log('db successfully initialized');
    } catch (error) {
        console.log(error)
    }
}