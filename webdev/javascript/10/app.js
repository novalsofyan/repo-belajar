const list = document.getElementById("userList");
const buttonRefresh = document.getElementById("buttonRefresh");

async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    list.innerHTML = "";

    users.forEach((user) => {
      const li = document.createElement("li");

      const address = user.address;
      const userAddress = `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
      const geo = user.address.geo;
      const userGeo = `Lat: ${geo.lat}, Lng: ${geo.lng}`;

      li.innerHTML = `
        <strong>${user.name}</strong><br>
        <em>${user.email}</em><br>
        📍 <span>${userAddress}</span><br>
        📍 <span>Geo location: ${userGeo}</span>
      `;

      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = `Gagal mengambil data, ${error}`;
    list.appendChild(li);
    console.error("Gagal ambil data:", error);
  }
}

getUsers();

buttonRefresh.addEventListener("click", async () => {
  console.log("Refreshing...");
  await getUsers();
  console.log("Selesai refresh!");
});
