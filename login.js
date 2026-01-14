

const client = supabase.createClient("https://gkjrdzqwelgkdzusaikn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdranJkenF3ZWxna2R6dXNhaWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzQxMzQsImV4cCI6MjA3NjU1MDEzNH0.KRWmGIE1m1KDgeer5Pi2tB_AvUe4mZmoImuZ2D_Q6Ig");

document.getElementById("loginbtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!(email && password)) {
    alert("Fill all fields");
    return;
  }

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Wrong email or password");
    return;
  }

  alert("Logged in!");
  window.location.href = "Home.html";
});
