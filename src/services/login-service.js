
export async function sendLogin(email, password) {
  
  const formValues = new FormData();

  formValues.append("email", email);
  formValues.append("password", password);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/login', {
      method: "POST",
      body: formValues,
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesion");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return error.message;
  }
}

export function logout(){
  localStorage.removeItem("user-id");
  window.location.reload();
}


export async function register({username, nombre, rol, masterId}) {
  
  const formValues = new FormData();

  formValues.append("username", username);
  formValues.append("nombre", nombre);
  formValues.append("rol", rol);
  formValues.append("masterId", masterId);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/register', {
      method: "POST",
      body: formValues,
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return error.message;
  }
}

export async function cambiarPassword({password, confirmarPassword, idUsuario}) {
  console.log(password, confirmarPassword, idUsuario)
  if(password !== confirmarPassword){
    return false;
  }

  const formValues = new FormData();

  formValues.append("idUsuario", idUsuario);
  formValues.append("password", password);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/setpassword', {
      method: "POST",
      body: formValues,
    });
    return response.ok

  } catch (error) {
    return error.message;
  }
}