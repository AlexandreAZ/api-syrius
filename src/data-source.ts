import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "adot2022",
    database: "postgres",
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: [],
})
