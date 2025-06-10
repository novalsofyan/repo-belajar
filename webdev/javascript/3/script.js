// alert("Ini alert");
// var a = prompt("ei ko ni ape?");
// alert("oh jadi ko ni " + a);
// var b = confirm("eh ko ni yakin ke?");
// if (b === true) {
//   alert("oh jadi ko yakin ke, kelah!");
// } else {
//   alert("alamak, ko ni pria macem apa tak yakin gitu la");
// }

alert("selamat datang ko ni");
var looping = true;

while (looping === true) {
  var nama = prompt("ko ni ape?");
  alert("oh jadi ko ni " + nama);
  var konfirmasi = confirm("eh ko yakin ke ko ni " + nama + " ?");
  if (konfirmasi === true) {
    looping = false;
  } else {
    looping = true;
  }
}

alert("oke " + nama + " , welcome la");
