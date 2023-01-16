import * as uuid from 'uuid';
import http from "http";
import { createUser, findUser, removeUser, users } from "./userController";

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

  if (req.url && req.url.startsWith("/api/users")) {
    switch (req.method) {
      case "GET":
        if(req.url === "/api/users") {
          result = users;
          status = 200
        } else {
          const findId = req.url.slice(11)
          const searchResult = await findUser(findId)
          if(searchResult) {
            result = searchResult
            status = 200
          } else {
            if (uuid.validate(findId)) {
              result = 'User not found'
              status = 404
            } else {
              result = 'Wrong user ID'
              status = 400
            }
          }
        }
        break;
      case "POST":
        const userBody = JSON.parse(data)
        console.log(userBody)
        if(typeof userBody.username === 'string' && typeof userBody.age === 'number' && Array.isArray(userBody.hobbies)) {
          result = await createUser(userBody)
          status = 201
        } else {
          result = 'Body does not contain required fields'
          status = 400
        }
        break;
      case "DELETE":
        const findId = req.url.slice(11)
        const searchResult = await findUser(findId)
          if(searchResult) {
            result = await removeUser(findId)
            status = 204
          } else {
            if (uuid.validate(findId)) {
              result = 'User not found'
              status = 404
            } else {
              result = 'Wrong user ID'
              status = 400
            }
          }
        break;
      default:
        result = 'Server error'
        status = 500
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
