import http from "http";
import { createUser, users } from "./userController";

const requestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.setHeader("Content-Type", "application/json");

  const buffers = [] as any;
	for await (const chunk of req) {
    buffers.push(chunk);
  }
	const data = Buffer.concat(buffers).toString();

  let result;
  let status;

  if (req.url === "/api/users") {
    switch (req.method) {
      case "GET":
        result = users;
        status = 200
        break;
      case "POST":
        result = await createUser(data)
        status = 201
        console.log(data)
        break;
      default:
        status = 500
        result = 'Server error'
        break;
    }

    res.statusCode = status;
    res.end(JSON.stringify(result));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

export default requestListener;
