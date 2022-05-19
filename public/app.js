const priceLaptop = document.querySelectorAll(".priceLaptop");
priceLaptop.forEach((item) => {
  item.textContent = new Intl.NumberFormat("uz-UZ", {
    currency: "uzb",
    style: "currency",
  }).format(item.textContent);
});
