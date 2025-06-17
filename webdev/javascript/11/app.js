async function create(blogPost) {
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({
      title: blogPost.title,
      body: blogPost.body,
      userId: blogPost.userId,
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Tampilkan hasil di halaman
    document.getElementById("responseBox").textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById("responseBox").textContent = "Error: " + error.message;
  }
}

// Tangani form submit
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Biar nggak reload halaman

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const userId = parseInt(document.getElementById("userId").value);

  create({ title, body, userId });
});
