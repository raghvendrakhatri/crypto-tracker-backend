export const config = () => ({
    app:{
        PORT: parseInt(process.env.SERVER_PORT,10) || 3000,
        HOST: process.env.SERVER_HOST || 'localhost'
    },
    database:{
        host:process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT,10) || 5432,
        username: process.env.DATABASE_USERNAME,
        password:process.env.DATABASE_PASSWORD,
        type:process.env.DATABASE_TYPE
    }
})