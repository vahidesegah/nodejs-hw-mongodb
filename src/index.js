import express from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import dotenv from "dotenv";

const PORT = process.env.PORT; //.env deki port u al
const app = express();

app.use(cors());

app.use(express.json());

app.use(
    pinoHttp({
        transport: {
            target: "pino-pretty",
        },
    }),
);

dotenv.config();



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });


