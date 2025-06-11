var noAngkot = 1;
for (var pengulangan = 1; pengulangan <= 10; pengulangan++) {
  if (pengulangan <= 6) {
    console.log("Angkot No. " + noAngkot + " sedang beroperasi dengan baik.");
    noAngkot++;
  } else if (pengulangan === 8) {
    console.log("Angkot No. " + noAngkot + " sedang lembur.");
    noAngkot++;
  } else {
    console.log("Angkot No. " + noAngkot + " sedang tidak beroperasi.");
    noAngkot++;
  }
}
