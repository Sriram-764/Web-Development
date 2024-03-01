document.getElementById("loginForm").addEventListener("submit", async
    function (event) {
    
    event.preventDefault();
    const eamil = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
    const response = await fetch("/login", {
    method: 'POST&',
    headers: {
    &#39;Content-Type&#39;: &#39;application/json&#39;
    },
    body: JSON.stringify({
    username,
    password
    })
    });
    if (response.ok) {
    alert(&#39;Login successful&#39;);
    // Clear form fields after successful login
    document.getElementById(&#39;username&#39;).value = &#39;&#39;;
    document.getElementById(&#39;password&#39;).value = &#39;&#39;;
    // Redirect to dashboard or perform any other action
    } else {
    const errorMessage = await response.text();
    alert(`Login failed: ${errorMessage}`);
    }
    } catch (error) {
    console.error(&#39;Error logging in:&#39;, error);
    alert(&#39;Error logging in.&#39;);
    }
});