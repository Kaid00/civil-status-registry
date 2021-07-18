

// Elements
const btn = document.getElementById('next1');
const form = document.getElementById('birth-form');

// Delegation


const createBirth = async (givenname, born_at, born_on, surname, sex, father_born_at, father_born_on, father_name, father_nationality, father_occupation, father_resident_at, father_ref_doc, mother_born_at, mother_born_on, mother_name, mother_nationality, mother_occupation, mother_ref_doc, mother_resident_at) => {
    try {
    
       const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/certificates/birth',
            data: {
                givenname, born_at, born_on, surname, sex, father_born_at, father_born_on, father_name, father_nationality, father_occupation, father_resident_at, father_ref_doc, mother_born_at, mother_born_on, mother_name, mother_nationality, mother_occupation, mother_ref_doc, mother_resident_at
            }

        })

        
        console.log(res);

        if (res.data.status === 'Success') {
            
            alert('Successful')
            // window.setTimeout(()=>{
            //     location.assign('/dashboard')
            // }, 1000)
        }
    } catch (err) {
       console.log(err.response.data);
    }
}



if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const givenname = document.getElementById('Givenname').value;

        const surname = document.getElementById('Surname').value;
        const born_at = document.getElementById('BornAt').value;
        const born_on = document.getElementById('born_on').value;

        var sex = document.querySelector('input[name="Gender"]:checked').value;

        const father_name = document.getElementById('Father-name').value;
        const father_ref_doc = document.getElementById('father-Id').value;
        const father_nationality = document.getElementById('father-nation').value;
        const father_resident_at = document.getElementById('father-Residence').value;
        const father_born_at = document.getElementById('father-Born-At').value;
        const father_born_on = document.getElementById('father-Born-On').value;
        const father_occupation = document.getElementById('father-Occupation').value;

        const mother_name = document.getElementById('mother-Name').value;
        const mother_ref_doc = document.getElementById('mother-Id').value;
        const mother_nationality = document.getElementById('mother-Nation').value;
        const mother_resident_at = document.getElementById('mother-Residence').value;
        const mother_born_at = document.getElementById('mother-Born-At').value;
        const mother_born_on = document.getElementById('mother-Born-On').value;
        const mother_occupation = document.getElementById('mother-Occupation').value;



        console.log(born_on);


        createBirth(givenname, born_at, born_on, surname, sex, father_born_at, father_born_on, father_name, father_nationality, father_occupation, father_resident_at, father_ref_doc, mother_born_at, mother_born_on, mother_name, mother_nationality, mother_occupation, mother_ref_doc, mother_resident_at);

    });
}



// // Elements
// const btn = document.getElementById('next1');
// const form = document.getElementById('birth-form');
// const btn2 = document.getElementById('btn');

// let id = '60f026da30b2900e809a1a10'
// btn2.addEventListener('click', async() => {
//     const watgot = await getBirth(id)
   
    
// })
// // Delegation

// export const testign = () => {
//     return 'Hello from export'
// }

// export const getBirth = async (id) =>{
  
//     try {
//       const res  = await axios({
//             method: 'GET',
//             url: `http://localhost:3000/api/certificates/birth/${id}`

//         })
//         document.getElementById('test').innerHTML = res.data.data.birth.born_at;
//         return res.data.data.birth;
//     } catch (error) {
//         console.log(error)
//     }
// }

// const createBirth = async (givenname, surname, born_at, born_on, father_name, father_born_at, father_born_on, father_ref_doc, father_occupation, father_resident_at, father_nationality, mother_born_at, mother_born_on, mother_ref_doc, mother_name, mother_occupation, mother_resident_at, mother_nationality, sex) => {
//     try {
    
//        const res = await axios({
//             method: 'POST',
//             url: 'http://127.0.0.1:3000/api/certificates/birth',
//             data: {
//                 givenname,
//                 surname,
//                 born_at, born_on, father_name, father_born_at, father_born_on, father_ref_doc, father_occupation, father_resident_at, father_nationality, mother_born_at, mother_born_on, mother_ref_doc, mother_name, mother_occupation, mother_resident_at, mother_nationality, sex
//             }

//         })

//         // getBirth(res.data.data.newBirth.id)
        
//         console.log(res.data.data.newBirth.id);

//         if (res.data.status === 'Success') {
            
//             alert('Successful')
//             // window.setTimeout(()=>{
//             //     location.assign('/dashboard')
//             // }, 1000)
//         }
//     } catch (err) {
//        console.log(err.response.data);
//     }
// }

    

// if (form) {
//     form.addEventListener('submit', event => {
//         event.preventDefault();
//         const givenname = document.getElementById('Givenname').value;

//         const surname = document.getElementById('Surname').value;
//         const born_at = document.getElementById('BornAt').value;
//         const born_on = document.getElementById('BornOn').value;

//         var sex = document.querySelector('input[name="Gender"]:checked').value;

//         const father_name = document.getElementById('Father-name').value;
//         const father_ref_doc = document.getElementById('father-Id').value;
//         const father_nationality = document.getElementById('father-nation').value;
//         const father_resident_at = document.getElementById('father-Residence').value;
//         const father_born_at = document.getElementById('father-Born-At').value;
//         const father_born_on = document.getElementById('father-Born-On').value;
//         const father_occupation = document.getElementById('father-Occupation').value;

//         const mother_name = document.getElementById('mother-Name').value;
//         const mother_ref_doc = document.getElementById('mother-Id').value;
//         const mother_nationality = document.getElementById('mother-Nation').value;
//         const mother_resident_at = document.getElementById('mother-Residence').value;
//         const mother_born_at = document.getElementById('mother-Born-At').value;
//         const mother_born_on = document.getElementById('mother-Born-On').value;
//         const mother_occupation = document.getElementById('mother-Occupation').value;



//         console.log(sex);


//         createBirth(givenname, surname, born_at, born_on, father_name, father_born_at, father_born_on, father_ref_doc, father_occupation, father_resident_at, father_nationality, mother_born_at, mother_born_on, mother_ref_doc, mother_name, mother_occupation, mother_resident_at, mother_nationality, sex);

//     });
// }