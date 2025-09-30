let clientes = [];
const form = document.getElementById("clientForm");
const msg = document.getElementById("successMessage");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (validar()) registrarCliente();
});

function validar() {
  const nombre = form.nombre.value.trim();
  const cedula = form.cedula.value.trim();
  const tel = form.telefono.value.trim();
  const email = form.email.value.trim();
  if (nombre.length < 2 || cedula.length < 8) return false;
  if (clientes.some(c => c.cedula === cedula || c.email === email)) return false;
  return true;
}

function registrarCliente() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.fechaRegistro = new Date().toLocaleDateString("es-ES");
  clientes.push(data);
  actualizarLista();
  actualizarStats();
  msg.style.display = "block";
  setTimeout(() => msg.style.display = "none", 2000);
  limpiarFormulario();
}

function actualizarLista() {
  const lista = document.getElementById("clientesList");
  lista.innerHTML = "";
  clientes.slice(-5).reverse().forEach(c => {
    lista.innerHTML += `
      <div class="client-card">
        <h4>${c.nombre}</h4>
        <p>Cédula: ${c.cedula}</p>
        <p>Email: ${c.email}</p>
        <p>Tel: ${c.telefono}</p>
        <p>${c.ciudad}, ${c.pais}</p>
      </div>`;
  });
  if (clientes.length > 5) lista.innerHTML += `<p>... y ${clientes.length-5} más</p>`;
}

function actualizarStats() {
  document.getElementById("totalClientes").textContent = clientes.length;
  const hoy = new Date().toLocaleDateString("es-ES");
  document.getElementById("clientesHoy").textContent = clientes.filter(c => c.fechaRegistro === hoy).length;
  const paisMas = clientes.reduce((acc,c)=>{acc[c.pais]=(acc[c.pais]||0)+1;return acc;}, {});
  document.getElementById("paisMasComun").textContent = Object.keys(paisMas).sort((a,b)=>paisMas[b]-paisMas[a])[0]||"-";
}

function limpiarFormulario(){ form.reset(); form.nombre.focus(); }
