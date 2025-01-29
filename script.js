// Simulated Data (Replace with Backend API Calls)
let jobs = [];

// Redirect to Provide Job Page
document.getElementById('provideJobBtn').addEventListener('click', () => {
  window.location.href = 'provide-job.html';
});

// Redirect to Take Job Page
document.getElementById('takeJobBtn').addEventListener('click', () => {
  window.location.href = 'take-job.html';
});

// Job Form Submission
if (document.getElementById('jobForm')) {
  document.getElementById('jobForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('jobTitle').value;
    const description = document.getElementById('jobDescription').value;
    const price = document.getElementById('jobPrice').value;
    const image = document.getElementById('jobImage').files[0];

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = () => {
      const job = { title, description, price, image: reader.result };
      jobs.push(job);
      localStorage.setItem('jobs', JSON.stringify(jobs));
      alert('Job posted successfully!');
      window.location.href = 'take-job.html';
    };
    reader.readAsDataURL(image);
  });
}

// Render Jobs on Take Job Page
if (document.getElementById('jobList')) {
  const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const jobList = document.getElementById('jobList');

  savedJobs.forEach((job) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.description}</p>
      <p><strong>Price:</strong> $${job.price}</p>
      <img src="${job.image}" alt="${job.title}">
      <button onclick="takeJob('${job.title}')">Take Job</button>
    `;
    jobList.appendChild(li);
  });
}

// Take Job Functionality
function takeJob(title) {
  alert(`You have taken the job: ${title}`);
  const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const updatedJobs = savedJobs.filter((job) => job.title !== title);
  localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  window.location.reload();
}