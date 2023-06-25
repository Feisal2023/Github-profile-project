// selecting dom elements
const input = document.querySelector('#search');
const userDetails = document.querySelector('#userDetails');

function searchUsers() {
  const xhr = new XMLHttpRequest();
  const userName = input.value.trim();
  const url = `https://api.github.com/users/${userName}`;
  xhr.open('GET', url);
  xhr.onreadystatechange =  function () {
    if(this.readyState === 4) {
      if(this.status === 200) {
        const user = JSON.parse(this.responseText);
          // Extract the year from created_at timestamp
          const createdAt = new Date(user.created_at);
          const year = createdAt.getFullYear();
          // if the user exist display details
          userDetails.innerHTML = `
          <div class="profile-info">
          <img src="${user.avatar_url}" alt="">
          <h3>Name: ${user.name}</h3>
          <p>Username: ${user.login}</p>
          <p>Joined: ${year}</p>
          <div class="follow">
            <p>Following: ${user.following}</p>
            <p>Followers: ${user.followers}</p>
          </div>
          <button><a href="${user.html_url}" target="_blank">Visit</a></button>
        </div>
          `
} else if(input.value.trim() !== '') {
  if(this.status === 404) {
    userDetails.innerHTML = `
    <p>User not found</p>
    `;

  } 
} else {
  userDetails.innerHTML = ''; // Clear the user details
}

      
    }
  }
  xhr.send();
}

input.addEventListener('keyup', searchUsers);

