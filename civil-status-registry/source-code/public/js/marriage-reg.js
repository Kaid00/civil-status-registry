

// Elements

const form = document.getElementById('marriage-form');
console.log(form)

// Delegation


const createMarriage = async (groom_given_name, groom_surname, groom_id_num, groom_place_birth, groom_born_on, bride_given_name, bride_surname, bride_id_num, bride_place_birth, bride_born_on, groom_father_name, groom_mother_name, bride_father_name, bride_mother_name, groom_nationality, groom_profession, groom_resident_at, groom_family_head, groom_witness_name, bride_nationality, bride_profession, bride_resident_at, bride_family_head, bride_witness_name, matrimonial_regime, objections, marriage_type) => {
    try {
    
       const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/certificates/marriage',
            data: {
                groom_given_name, groom_surname, groom_id_num, groom_place_birth, groom_born_on, bride_given_name, bride_surname, bride_id_num, bride_place_birth, bride_born_on, groom_father_name, groom_mother_name, bride_father_name, bride_mother_name, groom_nationality, groom_profession, groom_resident_at, groom_family_head, groom_witness_name, bride_nationality, bride_profession, bride_resident_at, bride_family_head, bride_witness_name, matrimonial_regime, objections, marriage_type
            }
        })

        
        console.log(res);

        if (res.data.status === 'success') {
            
            (async( ) => {
                try{
                    const createPdf =  await axios({
                            method: 'GET',
                            url: 'http://localhost:3000/create-marriage-pdf'
                        })  
                    
                        
                    if (createPdf.data.status === 'success') {

                        alert('Marriage Registered Successful, redirecting to print page')
                                    
                        window.setTimeout(()=>{
                            location.assign('/generate-marriage-certificate')
                        }, 1000);

                    }
                    
                } catch(err) {
                    console.log(err)
                } 

               
            })();
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
        const groom_id_num = document.getElementById('groom_reference_doc').value;
        const groom_place_birth = document.getElementById('groom_place_birth').value;
        const groom_born_on = document.getElementById('groom_born_on').value;
        const groom_nationality = document.getElementById('groom_nationality').value;
        const groom_profession = document.getElementById('groom_profession').value;
        const groom_resident_at = document.getElementById('groom_resident_at').value;
        const groom_family_head = document.getElementById('groom_family_head').value;
        const groom_witness_name = document.getElementById('groom_witness_name').value;

        const bride_given_name = document.getElementById('bride_given_name').value;
        const bride_surname = document.getElementById('bride_surname').value;
        const bride_id_num = document.getElementById('bride_reference_doc').value;
        const bride_place_birth = document.getElementById('bride_place_birth').value;
        const bride_born_on = document.getElementById('bride_born_on').value;
        const bride_nationality = document.getElementById('bride_nationality').value;
        const bride_profession = document.getElementById('bride_profession').value;
        const bride_resident_at = document.getElementById('bride_resident_at').value;
        const bride_family_head = document.getElementById('bride_family_head').value;
        const bride_witness_name = document.getElementById('bride_witness_name').value;

        const groom_father_name = document.getElementById('groom_father_name').value;
        const groom_mother_name = document.getElementById('groom_mother_name').value;

        const bride_father_name = document.getElementById('bride_father_name').value;
        const bride_mother_name = document.getElementById('bride_mother_name').value;

        let matrimonial_regime = document.querySelector('input[name="regime"]:checked').value;
        let objections = document.querySelector('input[name="objections"]:checked').value;
        let marriage_type = document.querySelector('input[name="type"]:checked').value;


   
      //  console.log(bride_mother_name, groom_surname, groom_father_name)

        createMarriage(groom_given_name, groom_surname, groom_id_num, groom_place_birth, groom_born_on, bride_given_name, bride_surname, bride_id_num, bride_place_birth, bride_born_on, groom_father_name, groom_mother_name, bride_father_name, bride_mother_name, groom_nationality, groom_profession, groom_resident_at, groom_family_head, groom_witness_name, bride_nationality, bride_profession, bride_resident_at, bride_family_head, bride_witness_name, matrimonial_regime, objections, marriage_type);

    });
}