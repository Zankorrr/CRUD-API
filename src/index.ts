import 'dotenv/config';
import http from 'http';
import requestListener from './requestController';

const port = process.env.PORT || 4000;
const users: string[] = ['user1']



const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});