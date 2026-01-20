const header = document.querySelector('header')


header.innerHTML = `
    <div class="logo"> <a href="../../../index.html"> {Hello World!} </a> </div>
    <nav class="nav-links">
      <a href="#" id="link-products">Products</a>
      <a href="#" id="link-home">Home</a>
      <a href="#">Solutions</a>
      <a href="#">Community</a>
      <a href="#">Resources</a>
      <a href="#">Pricing</a>
      <a href="#">Contact</a>
      <a href="#">Link</a>
    </nav>
    <div class="nav-buttons">
      <a class="btn-outline" href="login.html">Sign in</a>
      <a class="btn-dark-a" href="../register/register.html">Register</a>
    </div>`