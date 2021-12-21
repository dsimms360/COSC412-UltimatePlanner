
const getUser = () => {
    axios.get('/get-user-info')
    .then(response => {
        var userData = response.data[0];
        document.getElementById('fName-Block').innerHTML = userData.fName;
        document.getElementById('lName-Block').innerHTML = userData.lName;
        document.getElementById('Email-Block').innerHTML = userData.email;
        console.log(response.data)
    })
    .catch(err => {
        console.log(err)
    })
} 

getUser();