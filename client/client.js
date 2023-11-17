console.log('client')

const user = document.getElementById('user');
const admin = document.getElementById('admin');
const random = document.getElementById('random');
const response = document.getElementById('response');
const adminData = document.getElementById('admin-data');
const cookies = document.getElementById('cookies');

const payload = {
  user: {
    username: "Chiyu",
    role: "User",
  },
  admin: {
    username: "Prakhar",
    role: "Admin",
  },
  random: {
    username: "Abc",
    role: "random-role",
  }
}

user.addEventListener('click', () => {
  fetch('http://localhost:3000/login', {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.user)
  })
    .then(res => res.text())
    .then((res) => {
      response.textContent = res;
    })
})

admin.addEventListener('click', () => {
  fetch('http://localhost:3000/login', {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.admin)
  })
    .then(res => res.text())
    .then((res) => {
      response.textContent = res;
    })
})

random.addEventListener('click', () => {
  fetch('http://localhost:3000/login', {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.random)
  })
    .then(res => res.text())
    .then((res) => {
      response.textContent = res;
    })
})


adminData.addEventListener('click', () => {
  fetch('http://localhost:3000/admin-data', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include"
  })
    .then(res => res.text())
    .then((res) => {
      response.textContent = res;
    })
})