// Button status

const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) =>
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    })
  );
}

//end button

// form search

const formSearch = document.querySelector("#form-search");

if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.elements.keyword);
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

// end form

// pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
//end pagination

//checkbox

const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputID = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputID.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputID.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputID.forEach((input) => {
    input.addEventListener("click", () => {
      if (input.checked) {
        let checkFull = true;
        for (let i = 0; i < inputID.length; i++) {
          if (!inputID[i].checked) {
            checkFull = false;
            break;
          }
        }

        if (checkFull) {
          inputCheckAll.checked = true;
        }
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

//end checkbox

//form change multi

const formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Mày có chắc muốn xóa không?");

      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = [];

      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputChecked.forEach((input) => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(",");

      formChangeMulti.submit();
    } else {
      alert("Please choose at least one product!");
    }
  });
}
//end form change multi

//show alert

const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  const closeAlert = showAlert.querySelector("[close-alert]")

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })

}

//end show alert



//form bin

const formBin = document.querySelector("[form-bin]");

if (formBin) {
  formBin.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Mày có chắc muốn xóa VĨNH VIỄN không?");

      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = [];

      const inputIds = formBin.querySelector("input[name='ids']");

      inputChecked.forEach((input) => {
        const id = input.value;
        ids.push(id);
      });

      inputIds.value = ids.join(",");

      formBin.submit();
    } else {
      alert("Please choose at least one product!");
    }
  });
}
//end form bin

//upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const imgPreviewWrapper = document.querySelector(".img-preview");
  const closeBtn = document.querySelector(".close-btn");

  // khi chọn ảnh
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      imgPreviewWrapper.style.display = "block";
    } else {
      uploadImagePreview.src = "";
      imgPreviewWrapper.style.display = "none";
    }
  });

  // khi bấm nút X
  closeBtn.addEventListener("click", () => {
    uploadImagePreview.src = "";
    uploadImageInput.value = ""; // xoá file khỏi input
    imgPreviewWrapper.style.display = "none";
  });
}

//end upload image


//sort 
const sort = document.querySelector("[sort]")
if (sort){
  let url = new URL(window.location.href)
  const sortSelect = sort.querySelector("[sort-select]")
  const sortClear = sort.querySelector("[sort-clear]")

  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value
    const [sortKey, sortValue] = value.split("-")
    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)

    window.location.href = url.href
  })

  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey")
    url.searchParams.delete("sortValue")
    window.location.href = url.href
  })

  const sortKey = url.searchParams.get("sortKey")
  const sortValue = url.searchParams.get("sortValue")

  if (sortKey && sortValue){
    const stringSort = `${sortKey}-${sortValue}`
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
    optionSelected.selected = true
  }
}
//end sort