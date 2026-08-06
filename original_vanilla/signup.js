

const supa = supabase.createClient(
  "https://gkjrdzqwelgkdzusaikn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdranJkenF3ZWxna2R6dXNhaWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzQxMzQsImV4cCI6MjA3NjU1MDEzNH0.KRWmGIE1m1KDgeer5Pi2tB_AvUe4mZmoImuZ2D_Q6Ig"
);





document.getElementById("signupbtn").addEventListener("click", async () => {

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

 
  if (!(username && email && password)) {
    alert("Please fill in all fields.");
    return;}

   
    
    
    const { data, error } = await supa.auth.signUp({
        email: email,
        password: password,
        options:{
        data: { username: username }
        }
      });
      
      if (error) {
        alert("Error: " + error.message);
        console.log("Error details:", error);
        return;
      }
      alert("Signup successful! Check your email.");
  window.location.href = "Login.html";})