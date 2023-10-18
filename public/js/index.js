const loginOrSignUp = document.getElementById('loginOrSignUp');

loginOrSignUp.addEventListener('click', function goToLogin() {
    location.href = '/login'
})

const post = document.getElementById('post')

post.addEventListener('click', function() {
    location.href = '/post'
})

function search() {
    const input = document.getElementById('search')
    const searchTerm = input.value
}