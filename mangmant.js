let titel = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let togg = document.querySelector(".togg")
let body = document.querySelector("body")
let categrory  = document.getElementById("categrory")
let submit = document.getElementById("submit")
let mood = 'create'
let tmp;
console.log(titel,discount,total,categrory)
function gettotal(){
    if(price.value!=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML=result
        total.style.background="#090"
    }else{
        total.innerHTML=''
        total.style.background="yellow"
        total.style.color="black"
    }
}
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}


submit.onclick=function(){
    let newpro={
        titel:titel.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, 
        count:count.value,
        categrory:categrory.value.toLowerCase(),
    }
     if ( titel.value != '' && price.value != '' && categrory.value != '' && newpro.count<1000){
        if (mood==='create'){
            if(newpro.count>1){
                for( let r=0;r<newpro.count;r++){
                    datapro.push(newpro)
            }
            }else{
                datapro.push(newpro)
            }
        
        }else{
            datapro[ tmp ]=newpro
            mood='create'
            submit.innerHTML='create'
            count.style.display='block'
        }
        cleardata()
    }
    
    

    localStorage.setItem('product',  JSON.stringify(datapro)  )
    show()
    }
function cleardata(){
    titel.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    categrory.value=''
}
function show()
{
    gettotal()
    let table = ''
    for(let r = 0; r < datapro.length;r++){
        table+=`
        <tr>
            <td>${r+1}</td>
            <td>${datapro[r].titel}</td>
            <td>${datapro[r].price}</td>
            <td>${datapro[r].taxes}</td>
            <td>${datapro[r].ads}</td>
            <td>${datapro[r].discount}</td>
            <td>${datapro[r].total}</td>
            <td>${datapro[r].categrory}</td>
            <td><button onclick="update(${r})" id="update">update</button></td>
            <td><button onclick="delet(${r})" id="delet">delet</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table
    let btndelet = document.getElementById('deletall')
    if(datapro.length > 0){
        btndelet.innerHTML=`
        <button onclick='deletAll()'>Delet All(${datapro.length})</button> `
    }else{
        btndelet.innerHTML=``
    }
}
show()
function delet(r){
    datapro.splice(r,1)
    localStorage.product= JSON.stringify(datapro)
    show()
}
function deletAll(){
    localStorage.clear()
    datapro.splice(0)
    show()
}
function update(r){
    titel.value=datapro[r].titel;
    price.value=datapro[r].price;
    taxes.value=datapro[r].taxes;
    ads.value=datapro[r].ads;
    discount.value=datapro[r].discount;
    categrory.value=datapro[r].categrory;
    gettotal()
    count.style.display='none'
    submit.innerHTML='Update'
    mood = "Update"
    tmp = r;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
let searchmood ='title'
function getsearchmood(id){
    let search = document.getElementById('search')
    if(id=='searTitle'){
        searchmood ='title'
        search.placeholder ='search by Title'
    }else{
        searchmood ='category'
        search.placeholder ='search by Category'
    }

search.focus()
search.value=''
show()
}
function searchdata(value){
    let table ='';
    if(searchmood=='title'){
        for (let r = 0; r < datapro.length; r++) {
           if(datapro[r].titel.includes(value.toLowerCase())){
            table+=`
            <tr>
                <td>${r+1}</td>
                <td>${datapro[r].titel}</td>
                <td>${datapro[r].price}</td>
                <td>${datapro[r].taxes}</td>
                <td>${datapro[r].ads}</td>
                <td>${datapro[r].discount}</td>
                <td>${datapro[r].total}</td>
                <td>${datapro[r].categrory}</td>
                <td><button onclick="update(${r})" id="update">update</button></td>
                <td><button onclick="delet(${r})" id="delet">delet</button></td>
            </tr>
            `
           } 
        }
    }else{
        for (let r = 0; r < datapro.length; r++) {
            if(datapro[r].categrory.includes(value.toLowerCase())){
             table+=
             `
             <tr>
                 <td>${r+1}</td>
                 <td>${datapro[r].titel}</td>
                 <td>${datapro[r].price}</td>
                 <td>${datapro[r].taxes}</td>
                 <td>${datapro[r].ads}</td>
                 <td>${datapro[r].discount}</td>
                 <td>${datapro[r].total}</td>
                 <td>${datapro[r].categrory}</td>
                 <td><button onclick="update(${r})" id="update">update</button></td>
                 <td><button onclick="delet(${r})" id="delet">delet</button></td>
             </tr>
             `
            } 
         }
    }
    document.getElementById('tbody').innerHTML=table
}
togg.onclick=function(){
    body.classList.toggle("dark")
}