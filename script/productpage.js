import {
    navbar
} from "../components/navbar.js";
import {
    navbar_function
} from "../components/navbar_function.js";

document.querySelector("#nav-start").innerHTML = navbar();

setTimeout(() => {
    navbar_function()
}, 1000);
let allimgb = document.querySelectorAll("#z-product-color>img")
for (let i = 0; i < allimgb.length; i++) {
    allimgb[i].addEventListener("click", () => {
        selectcolorfun(i)
    })
}
let data = JSON.parse(localStorage.getItem("productpage"))
console.log(data)

function sortvalue(value) {
    if (value == null) {
        return
    }
    value = value.trim()
    value = value.split("")
    //  console.log(value)
    for (let i = 0; i < value.length; i++) {
        if (value[i] == "$" || value[i] == "," || value[i] == "o" || value == "f" || value == "f" || value == "%" || value == ' ') {
            value.splice(i, 1)
            i = 0
        }
    }
    if (value[5] == "f") {
        value = value.join("")
        let x = value[0] + value[1]
        return Number(x)
    }
    return Number(value.join(""))

}

function append() {
    document.querySelector("#z-product-img img").src = data[0]["Image18__image src"]
    document.querySelector("#fp").innerText = data[0].PriceWithSchema9__value
    if (data[0].ProductItem24__designer != undefined) {
        document.querySelector("#z-product-detail h2").innerText = data[0].ProductItem24__designer
    } else {
        document.querySelector("#z-product-detail h2").innerText = null
    }
    document.querySelector("#des").innerText = data[0].ProductItem24__name
    document.querySelector("#z-offerp s").innerText = data[0].PriceWithSchema9__wasPrice
    document.querySelector("#z-offerp span").innerText = data[0].PriceWithSchema9__discount
    let finalp = sortvalue(data[0].PriceWithSchema9__wasPrice) - sortvalue(data[0].PriceWithSchema9__value)


    document.querySelector("#approx").innerText = `(Approx. ${finalp})`
}
append()

function selectcolorfun(x) {
    if (allimgb[x].style.border == "1px solid black") {
        allimgb[x].style.border = "2px solid black"
        document.querySelector("#z-product-color p").innerText = `Color:${allimgb[x].style.backgroundColor}`
    } else {
        allimgb[x].style.border = "1px solid black"
    }
    if (allimgb[0] != allimgb[x]) {
        allimgb[0].style.border = "1px solid black"
    }
    if (allimgb[1] != allimgb[x]) {
        allimgb[1].style.border = "1px solid black"
    }
}
let allsizec = document.querySelectorAll("#z-product-size>div")
for (let i = 0; i < allsizec.length; i++) {
    allsizec[i].addEventListener("click", () => {
        sizechangefun(i)
    })
}

function sizechangefun(x) {
    if (allsizec[x].style.border == "1px solid black") {
        allsizec[x].style.border = "2px solid black"

    } else {
        allsizec[x].style.border = "1px solid black"
    }
    if (allsizec[0] != allsizec[x]) {
        allsizec[0].style.border = "1px solid black"
    }
    if (allsizec[1] != allsizec[x]) {
        allsizec[1].style.border = "1px solid black"
    }
    if (allsizec[2] != allsizec[x]) {
        allsizec[2].style.border = "1px solid black"
    }
}
document.querySelector("#z-detail-whole").addEventListener("click", wholedetailsfun)

function wholedetailsfun() {
    if (document.querySelector("#z-detail-whole ul").style.display == "none") {
        document.querySelector("#z-detail-whole ul").style.display = "block"
        document.querySelector("#ini-detail .fa-chevron-down").style.transform = "rotate(180deg)"
    } else {
        document.querySelector("#z-detail-whole ul").style.display = "none"
        document.querySelector("#ini-detail .fa-chevron-down").style.transform = "rotate(0deg)"
    }
}
document.querySelector("#z-detail-sizenfit").addEventListener("click", wholesizefun)

function wholesizefun() {
    if (document.querySelector("#z-detail-sizenfit ul").style.display == "none") {
        document.querySelector("#z-detail-sizenfit ul").style.display = "block"
        document.querySelector("#ini1-detail .fa-chevron-down").style.transform = "rotate(180deg)"
    } else {
        document.querySelector("#z-detail-sizenfit ul").style.display = "none"
        document.querySelector("#ini1-detail .fa-chevron-down").style.transform = "rotate(0deg)"
    }
}

let add_to_bag_btn = document.querySelector("#add_to_bag");
add_to_bag_btn.addEventListener("click", addToBag);
let s_fromlocal = JSON.parse(localStorage.getItem("cart_data"));
if (s_fromlocal == null) {
    var s_data = [];
} else {
    s_data = s_fromlocal
}

function addToBag() {
    s_data.push(data[0]);
    localStorage.setItem("cart_data", JSON.stringify(s_data));
    add_to_bag_btn.innerText = "Added to Bag";
    numberOfProduct();
}

let wishData = JSON.parse(localStorage.getItem("wishlist")) || [];

let wishlist = (() => {
    event.preventDefault()
    wishData.push(data[0]);
    localStorage.setItem("wishlist", JSON.stringify(wishData));
    let w = document.getElementById("add_to_wishlist");
    w.innerText = "Added to Wishlist";
});

function numberOfProduct(){
    let number_of_prodtct=document.querySelector("#lblCartCount");
    let data=JSON.parse(localStorage.getItem("cart_data"))
    number_of_prodtct.innerText=data.length;
}
numberOfProduct();
document.getElementById("add_to_wishlist").addEventListener("click", wishlist);