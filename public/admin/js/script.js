// Button status

const buttonStatus = document.querySelectorAll("[button-status]");



if (buttonStatus.length > 0){
    let url = new URL(window.location.href)
    buttonStatus.forEach(button => (
        button.addEventListener("click", () =>{
            const status = button.getAttribute("button-status")
            if (status){
                url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    ))
}

//end button

// form search

const formSearch = document.querySelector("#form-search")

if (formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e.target.elements.keyword)
        const keyword = e.target.elements.keyword.value
        if (keyword){
            url.searchParams.set("keyword", keyword)
        }else{
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href
    })
}

// end form


// pagination

const buttonPagination = document.querySelectorAll("[button-pagination]")
if (buttonPagination){
    let url = new URL(window.location.href)

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
}
//end pagination

//checkbox

const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputID = checkboxMulti.querySelectorAll("input[name='id']")
    

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked){
            inputID.forEach(input => {
                input.checked = true
            })
        }else{
            inputID.forEach(input => {
                input.checked = false
            })
        }
    })

    inputID.forEach(input => {
        input.addEventListener("click", () => {
            if (input.checked){
                let checkFull = true;
                for (let i = 0; i < inputID.length; i++){
                    if (!inputID[i].checked){
                        checkFull = false;
                        break;
                    }
                }

                if (checkFull){
                    inputCheckAll.checked = true;
                }
            }else{
                inputCheckAll.checked = false;
            }
        })
    })
}

//end checkbox

//form change multi

const formChangeMulti = document.querySelector("[form-change-multi]")

if (formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()

        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")
        
        if (inputChecked.length > 0){
            let ids = []

            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputChecked.forEach(input => {
                const id = input.value
                ids.push(id)
            })

            inputIds.value = ids.join(',')

            formChangeMulti.submit()
        }else{
            alert("Please choose at least one product!")
        }
    })
}
//end form change multi