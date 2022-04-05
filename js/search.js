function search(id) {
    sessionStorage.setItem("searchId", id);
    window.location = "search.html";
    return false;
}
function getSearches(){
    let searchId=sessionStorage.getItem("searchId");
}