

// Elements
const btn = document.getElementById('next1');
const form = document.getElementById('birth-form');

// Delegation


const createBirth = async (givenname, surname, born_at, born_on, father_name, father_born_at, father_born_on, father_ref_doc, father_occupation, father_resident_at, father_nationality, mother_born_at, mother_born_on, mother_ref_doc, mother_name, mother_occupation, mother_resident_at, mother_nationality, sex) => {
    try {
    
       const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/certificates/birth',
            data: {
                givenname,
                surname,
                born_at, born_on, father_name, father_born_at, father_born_on, father_ref_doc, father_occupation, father_resident_at, father_nationality, mother_born_at, mother_born_on, mother_ref_doc, mother_name, mother_occupation, mother_resident_at, mother_nationality, sex
            }

        })

        
        console.log(res.data.data.newBirth.id);

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
        const born_on = document.getElementById('BornOn').value;

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



        console.log(sex);


        createBirth(givenname, surname, born_at, born_on, father_name, father_born_at, father_born_on, father_ref_doc, father_occupation, father_resident_at, father_nationality, mother_born_at, mother_born_on, mother_ref_doc, mother_name, mother_occupation, mother_resident_at, mother_nationality, sex);

    });
}