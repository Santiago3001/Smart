(function () {
    'use strict'
  
    feather.replace({ 'aria-hidden': 'true' })
  
    
  })()

  function Alternar(Sec1,Sec2,Sec3){ 
    if (Sec1.style.display=="none"){
      Sec1.style.display="";
      Sec2.style.display="none";
      Sec3.style.display="none";
    }  
  }


function filtrar(entrada,tabla) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(entrada);
  filter = input.value.toUpperCase();
  table = document.getElementById(tabla);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = (td.textContent || td.innerText)+
      (td2.textContent || td2.innerText)+
      (td3.textContent || td3.innerText);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

  