

// Elements

const form = document.getElementById('marriage-form');
console.log(form)

// Delegation


const createMarriage = async (groom_given_name, groom_surname, groom_id_num, groom_place_birth, groom_date_birth , bride_given_name, bride_surname, bride_id_num, bride_place_birth, bride_date_birth,  groom_father_name, groom_mother_name, bride_father_name, bride_mother_name, place_of_marriage, date_of_marriage) => {
    try {
    
       const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/certificates/marriage',
            data: {
                groom_given_name, groom_surname, groom_id_num, groom_place_birth, groom_date_birth , bride_given_name, bride_surname, bride_id_num, bride_place_birth, bride_date_birth, groom_father_name, groom_mother_name, bride_father_name, bride_mother_name, place_of_marriage, date_of_marriage
            }
        })

        
        console.log(res);

        if (res.data.status === 'success') {
            
            alert('Marriage Registered Successfully')
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

        const groom_given_name = document.getElementById('groom_given_name').value;
        const groom_surname = document.getElementById('groom_surname').value;
        const groom_id_num = document.getElementById('groom_id_num').value;
        const groom_place_birth = document.getElementById('groom_place_birth').value;
        const groom_date_birth = document.getElementById('groom_date_birth').value;

        const bride_given_name = document.getElementById('bride_given_name').value;
        const bride_surname = document.getElementById('bride_surname').value;
        const bride_id_num = document.getElementById('bride_id_num').value;
        const bride_place_birth = document.getElementById('bride_place_birth').value;
        const bride_date_birth = document.getElementById('bride_date_birth').value;

        const groom_father_name = document.getElementById('groom_father_name').value;
        const groom_mother_name = document.getElementById('groom_mother_name').value;

        const bride_father_name = document.getElementById('bride_father_name').value;
        const bride_mother_name = document.getElementById('bride_mother_name').value;

        const place_of_marriage = document.getElementById('place_of_marriage').value;
        const date_of_marriage = document.getElementById('date_of_marriage').value;
        
      //  console.log(bride_mother_name, groom_surname, groom_father_name)

        createMarriage(groom_given_name, groom_surname, groom_id_num, groom_place_birth, groom_date_birth, bride_given_name, bride_surname, bride_id_num, bride_place_birth, bride_date_birth, groom_father_name, groom_mother_name, bride_father_name, bride_mother_name, place_of_marriage, date_of_marriage );

    });
}