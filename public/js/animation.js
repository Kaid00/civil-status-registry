
const profile_btn = document.getElementById('profile_btn');
const profile = document.getElementById('profile')
const options1 = document.getElementById('options1')
const options2 = document.getElementById('options2')
const closed_btn1 = document.getElementById('closed_btn1')
const closed_btn2 = document.getElementById('closed_btn2')
const open_btn2 = document.getElementById('open_btn2')
const open_btn1 = document.getElementById('open_btn1')
const create = document.getElementById('create');
const upload = document.getElementById('upload');


if (profile_btn) {
    profile_btn.addEventListener('click', () => {
        profile.classList.toggle("hidden")
    }) 
}
create.addEventListener('click', ()=>{
    closed_btn1.classList.toggle("hidden");
    open_btn1.classList.toggle("hidden");
    options1.classList.toggle("hidden")

})

upload.addEventListener('click', ()=>{
    closed_btn2.classList.toggle("hidden");
    open_btn2.classList.toggle("hidden");
    options2.classList.toggle("hidden")

})



