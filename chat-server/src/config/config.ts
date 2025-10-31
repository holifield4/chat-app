import dotenv from 'dotenv';

dotenv.config();

interface Config {
    jwtSecret: string;
}

const config: Config = {
    jwtSecret: process.env.JWT_SECRET || "",
}

export default config;