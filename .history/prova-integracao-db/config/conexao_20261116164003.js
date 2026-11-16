import mysql from "mysql/promise";
import dotenv from "dotenv";
dotenv.config();

const conexao = mysql.Createpool({
host:process.env.DB_HOST,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
datebase:process.env.DB_NAME,
port: Number(process.env.DB_PORT || 3001),
waitForConnections: true,
connectionLimits: 10,
queueLimit: 0
});

export default pool;