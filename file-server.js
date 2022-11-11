const fs = require("fs");
const path = require("path");
const { createServer } = require("http");

createServer((req, res) => {
  // create a dynamic file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // default content type
  let contentType = "text/html";

  // extract the extension from the filepath
  let mimeType = path.extname(filePath);

  // load various image types
  switch (mimeType) {
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
  }

  // read the target file and send to the client.
  fs.readFile(filePath, (error, data) => {
    // stop the execution and send nothing if the requested file path does not exist.
    if (error) return;

    // otherwise, fetch and show the target image
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data, "utf8");
  });
}).listen(5000);
