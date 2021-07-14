

const login = async (email, password) => {
    try {
        console.log(email, password)
       const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/users/login',
            data: {
                email,
                password
            }

        })

        console.log(res);
    } catch (err) {
        console.log(err.response.data);
    }
}

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    login(email, password);

});