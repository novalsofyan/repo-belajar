namaMenu = prompt("Pilih menu (nama paket: Hemat, Pelajar, Normal, Jumbo)");

switch (namaMenu) {
  case "Hemat":
    alert("Kamu berhasil memesan paket Hemat!");
    break;
  case "Pelajar":
    konfirmasiKartuPelajar = confirm("Kamu punya kartu pelajar?");
    if (konfirmasiKartuPelajar === true) {
      konfirmasiNoKartu = false;
      while (konfirmasiNoKartu === false) {
        noKartu = parseInt(prompt("Masukkan no kartu: "));
        while (isNaN(noKartu)) {
          alert("Masukkan no kartu dengan valid!");
          noKartu = parseInt(prompt("Masukkan no kartu: "));
        }
        konfirmasiNoKartu = confirm("Apakah " + noKartu + " sudah benar?");
      }
      alert("Selamat " + noKartu + "! kamu berhasil memesan paket Pelajar");
    } else {
      alert("Kamu bukan pelajar!");
    }
    break;
  case "Normal":
    alert("Kamu berhasil memesan paket Normal!");
    break;
  case "Jumbo":
    alert("Kamu berhasil memesan paket Jumbo!");
    break;
  default:
    alert("Masukkan paket menu dengan benar (huruf awal adalah huruf besar)");
}
