const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const $id = e.target.dataset.id;
      console.log("clicked");

      fetch("/card/remove/" + $id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.laptops.length) {
            const dynamicHtml = card.laptops
              .map((l) => {
                return `
              <tr>
              <td>${l.count}</td>
                <td>${l.title}</td>
                <td>${l.price}</td>
                <td>
                  <button class="btn btn-danger js-remove" data-id="${l.id}">Delete</button>
                </td>
              </tr>
            `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHtml;
            $card.querySelector(".price").textContent = card.price;
          } else {
            $card.innerHTML = "<p>Basket is empty!</p>";
          }
        });
    }
  });
}

/* Working with order router */
const toDate = (date) => {
  return new Intl.DateTimeFormat("us-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(date));
}

document.querySelectorAll(".date").forEach( d => {
  d.textContent = toDate(d.textContent);
})