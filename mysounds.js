const supa = supabase.createClient(
  "https://gkjrdzqwelgkdzusaikn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdranJkenF3ZWxna2R6dXNhaWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzQxMzQsImV4cCI6MjA3NjU1MDEzNH0.KRWmGIE1m1KDgeer5Pi2tB_AvUe4mZmoImuZ2D_Q6Ig"
);




async function checklogin() {
const { data: { user } } = await supa.auth.getUser();
 const box = document.getElementById("recordBox");
 
  const loginBtn = document.getElementById("loginBtnNav");
  const signupBtn = document.getElementById("signupBtnNav");
  const logoutBtn = document.getElementById("logoutBtnNav");
 
if (user) {
  console.log("Logged in:", user.email);
  box.innerHTML = `
      <h2>No recordings yet</h2>
      <p>Click below to begin your first recording.</p>
      <a href="Home.html">Start Recording</a>`;

       loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

} else {
  console.log("Not logged in");
   box.innerHTML = `
      <h2>Please log in first</h2>
      <p>You must be signed in to view your recordings.</p>
      <a href="Login.html">Log In</a>`;

      loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
}
}

checklogin();



document.getElementById("logoutBtnNav").addEventListener("click", async () => {
  await supa.auth.signOut();
  window.location.reload();
});