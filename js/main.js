let siteNameInput = document.querySelector("input[type='text']");
let siteUrlInput = document.querySelector("input[type='url']");
let btnSubmit = document.querySelector("button");
let btnDeleted = document.getElementById("btnDeleteUndo");

const myModal = new bootstrap.Modal("#myModal");

let ListOfBookmark = [];

if (localStorage.getItem("bookmarkList") !== null) {
  ListOfBookmark = JSON.parse(localStorage.bookmarkList);
  DisplayBookmark(ListOfBookmark);
}

// Validation Site Name
let siteNameRegex = /^[a-zA-Z]{3,}$/;
let UrlRegex = /(https?:\/\/)?(www.)?\w+\.\w([\w_!~@#$%^&*()-=/\+><\?,:\.])*/;

function isValidation(regex, ele) {
  if (regex.test(ele.value)) {
    ele.classList.add("border-success");
    ele.classList.remove("border-danger");
    return true;
  } else {
    ele.classList.remove("border-success");
    ele.classList.add("border-danger");
    return false;
  }
}

// Add Bookmark
btnSubmit.onclick = function () {
  if (
    isValidation(siteNameRegex, siteNameInput) &
    isValidation(UrlRegex, siteUrlInput)
  ) {
    let BookmarkObj = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value
    };
    ListOfBookmark.push(BookmarkObj);
    localStorage.setItem("bookmarkList", JSON.stringify(ListOfBookmark));
    DisplayBookmark(ListOfBookmark);
    resetInputBookmark();
  } else {
    myModal.show();
  }
};

// Reset Input Bookmark
function resetInputBookmark() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameInput.classList.remove("border-danger");
  siteNameInput.classList.remove("border-success");
  siteUrlInput.classList.remove("border-success");
  siteUrlInput.classList.remove("border-danger");
}

// Display BookMarks
function DisplayBookmark(arr) {
  let table = "";

  for (let i = 0; i < arr.length; i++) {
    table += `
      <tr>
          <th>${i + 1}</th>
          <td>${arr[i].siteName}</td>
          <td>
            <a href="${arr[i].siteUrl}" target="_blank">
            <button class="first btn text-white">
              <i class="fa-regular fa-eye"></i>
              Visit
            </button>
            </a>
          </td>
          <td>
            <button onclick="DeleteBookMark(${i})" class="last btn text-white">
              <i class="fa-regular fa-trash-can"></i> Delete
            </button>
          </td>
      </tr>
  `;
  }
  document.querySelector("table tbody").innerHTML = table;
}

// Delete Bookmark
let DeletedBookmark, Undoindex;
function DeleteBookMark(index) {
  Undoindex = index;
  DeletedBookmark = ListOfBookmark.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(ListOfBookmark));
  DisplayBookmark(ListOfBookmark);

  btnDeleted.style.backgroundColor = "red";
  btnDeleted.classList.replace("d-none", "d-inline-block");
  btnSubmit.classList.replace("d-block", "d-inline-block");
}

// Undo Deleted
btnDeleted.onclick = function () {
  btnDeleted.classList.replace("d-inline-block", "d-none");

  ListOfBookmark.splice(Undoindex, 0, DeletedBookmark[0]);
  localStorage.setItem("bookmarkList", JSON.stringify(ListOfBookmark));
  DisplayBookmark(ListOfBookmark);
};
