// const f = document.getElementById("form");
// const q = document.getElementById("search_bar");
// const google = "../search.html?search=";

// function submitted(event) {
//     event.preventDefault();
//     const url = google + q.value;
//     const win = window.open(url, "_blank");
//     win.focus();
//     console.log(url);
// }

// f.addEventListener("submit", submitted);

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.search; // "some_value"
console.log(value);