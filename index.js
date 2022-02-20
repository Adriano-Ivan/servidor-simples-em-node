const http = require("http");

const PORT = 3000;

const friends = [
  {
    id: 1,
    name: "Lord Wilmore",
  },
  {
    id: 2,
    name: "Nikola Tesla",
  },
  {
    id: 3,
    name: "Alexandre Dumas",
  },
];

const server = http.createServer();

server.on("request", (req, res) => {
  const items = req.url.split("/");
  console.log(req.url);
  // /friends/2 => ['','friends','2']
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log(`Request: ${data}`);
      friends.push(JSON.parse(friend));
    });

    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      res.end(
        JSON.stringify(
          friends.find((friend) => friend.id === parseInt(items[2]))
        )
      );
    } else {
      res.end(
        JSON.stringify({
          friends,
        })
      );
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Wilmore !</li>");
    res.write("<li>What are your thoughts on eccentricity ?</li> ");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");

    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
