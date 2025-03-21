import express from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import dotenv from "dotenv";


export function setupServer() {

dotenv.config();
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

app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found"})
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};


