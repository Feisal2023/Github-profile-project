const input = document.querySelector('#search');
const userDetails = document.querySelector('#userDetails');

function searchUsers() {
  const xhr = new XMLHttpRequest();
  const username = input.value.trim();
  const url = `https://api.github.com/users/${username}`;

  xhr.open('GET', url);

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const user = JSON.parse(xhr.responseText);

        if (user.message !== 'Not Found') {
             // Extract the year from the created_at timestamp
             const createdAt = new Date(user.created_at);
             const year = createdAt.getFullYear();
          // If user exists, display the details
          userDetails.innerHTML = `
            <div class="profile-info">
              <img src="${user.avatar_url}" alt="" />
              <h3 class="name">Name: ${user.name}</h3>
              <p class="username">Username: ${user.login}</p>
              <p class="joined">Joined: ${year}</p>
              <div class="follow">
                <p class="following">Following: ${user.following}</p>
                <p class="followers">Followers: ${user.followers}</p>
              </div>
            </div>
          `;
        } else {
          // If user doesn't exist, display a message
          userDetails.innerHTML = '<p>User not found</p>';
        }
      } else {
        // Display an error message if the request fails
        console.error('Request failed. Status:', this.status);
      }
    }
  };

  xhr.send();
}

input.addEventListener('keyup', searchUsers);
