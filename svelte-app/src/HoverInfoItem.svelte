<li><slot /></li>

<style>
  li {
    position: relative;
    display: block;
    padding: 1rem;
    transition-duration: 0.5s;
    inline-size: 100%;
  }

  li:hover,
  li:focus {
    background-color: yellowgreen;
    cursor: pointer;
  }
</style>
