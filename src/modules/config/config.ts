export const config = () => ({
    app:{
        PORT: parseInt(process.env.SERVER_PORT,10) || 3000,
        HOST: process.env.SERVER_HOST || 'localhost'
    }
})