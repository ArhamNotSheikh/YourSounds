
const supa = supabase.createClient(
  "https://gkjrdzqwelgkdzusaikn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdranJkenF3ZWxna2R6dXNhaWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzQxMzQsImV4cCI6MjA3NjU1MDEzNH0.KRWmGIE1m1KDgeer5Pi2tB_AvUe4mZmoImuZ2D_Q6Ig"
);
 
 
 
 
 async function updateNav() {
  const { data: { user } } = await supa.auth.getUser();

  const loginBtn = document.getElementById("loginBtnNav");
  const signupBtn = document.getElementById("signupBtnNav");
  const logoutBtn = document.getElementById("logoutBtnNav");

  if (user) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

updateNav();

document.getElementById("logoutBtnNav").addEventListener("click", async () => {
  await supa.auth.signOut();
  window.location.reload();
});
