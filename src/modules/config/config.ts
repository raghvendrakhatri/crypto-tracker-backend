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
    },
    bcrypt:{
        rounds: parseInt(process.env.ROUNDS) || 10
    },
    jwt:{
        accessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret:process.env.REFRESH_TOKEN_SECRET,
        accessTokenExpireTime:process.env.ACCESS_TOKEN_EXPIRE_TIME,
        refreshTokenExpireTime:process.env.REFRESH_TOKEN_EXPIRE_TIME,
    },
    aws:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretKey:process.env.AWS_ACCESS_KEY_SECRET,
        bucketName:process.env.AWS_BUCKET_NAME,
        region:process.env.AWS_REGION
    },
    url:{
        coinApi:process.env.COIN_API_BASE_URL
    }
})