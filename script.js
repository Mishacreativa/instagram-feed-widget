const databaseId = "225a5475628681e8915af74554c5e6d8";
const notionApiKey = "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"; // <- Pegá tu token secreto aquí

const fetchData = async () => {
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${notionApiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();
  const posts = data.results;

  const grid = document.getElementById("feed");

  posts.forEach(post => {
    const files = post.properties.Imagen.files;
    if (files && files.length > 0 && files[0].type === "external") {
      const imgUrl = files[0].external.url;
      const img = document.createElement("img");
      img.src = imgUrl;
      grid.appendChild(img);
    } else if (files && files.length > 0 && files[0].type === "file") {
      const imgUrl = files[0].file.url;
      const img = document.createElement("img");
      img.src = imgUrl;
      grid.appendChild(img);
    }
  });
};

fetchData();
