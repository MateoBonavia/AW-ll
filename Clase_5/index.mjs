import fsp from "node:fs/promises";
import path from "node:path";

(async function fetchData() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/users");

    const users = await res.json();

    const usersFormatted = users.map(({ id, email, userName }) => ({
      id,
      email,
      userName,
    }));

    const usersPath = "./users.json";

    const content = await fsp.writeFile(
      usersPath,
      JSON.stringify(usersFormatted),
      "utf8",
    );

    const dataRead = JSON.parse(content);

    console.log(dataRead);
  } catch (err) {
    console.log(err.message);
  }
})();
