import express, { Express } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app: Express = express();

app.use(express.json());

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

const privateKey = "jaishreeram";

app.get("/healthcheck", (req, res) => {
  res.json({
    success: true,
    message: "App is healthy...",
  });
});

`
  THIS IS A TEST DATABASE
`;

const db = [
  {
    username: "Prakhar",
    role: "Admin",
  },
  {
    username: "Chiyu",
    role: "User",
  },
];

app.get("/admin-data", (req, res) => {
  console.log("trying to get admin data");
  try {
    const cookie = req.headers.cookie;
    const data = cookie?.split(";");
    let appToken = data?.find((value) => {
      const tokens = value.split("=");
      const key = tokens[0],
        token = tokens[1];
      if (key === "sessionId") {
        return true;
      }
    });

    if (!appToken) appToken = "";

    appToken = appToken.split("=")[1];

    jwt.verify(appToken, privateKey);

    const jwtPayload: any = jwt.decode(appToken);

    if (jwtPayload.role === "Admin") {
      res.status(200).json({
        message: "this is super secret admin data",
      });
    } else {
      throw "Not allowed role...";
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/login", (req, res) => {
  console.log("trying to login");

  try {
    const { username, role } = req.body;

    const userExists = db.some(
      (user) => user.username === username && user.role === role
    );

    if (!userExists) {
      throw Error();
    }

    const token = jwt.sign(
      {
        username,
        role,
      },
      privateKey
    );

    const currentDate = new Date();
    const oneDayAhead = new Date(currentDate);
    oneDayAhead.setDate(currentDate.getDate() + 1);

    res
      .cookie("sessionId", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: oneDayAhead,
      })
      .status(200)
      .json({
        message: "User is authenticated.",
        role: role,
      });
  } catch (e) {
    res
      .cookie("sessionId", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(401)
      .send({
        message: "Error authenticating your request.",
      });
  }
});

app.listen(3000, () => {
  console.log("port listening on port 3000");
});
