import { createServer } from "http";

const PORT = 8080;
const HOST = "0.0.0.0";

function startMinimalWebServer() {
  const requestListener = (req: any, res: any) => {
    res.writeHead(200);
    res.end("OK");
  };
  const server = createServer(requestListener);
  server.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

export { startMinimalWebServer };
