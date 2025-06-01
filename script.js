const token = 'c69a2b4a8bc42e'; // Substitua pelo seu token do Ipinfo.io

async function fetchIPInfo() {
    try {
        // Pega o IP digitado pelo usuário
        const ipInput = document.getElementById('ipInput');
        const userIP = ipInput && ipInput.value ? ipInput.value : '';

        if (!userIP) {
            alert('Por favor, digite um IP.');
            return;
        }

        // Busca informações do IP usando Ipinfo
        const response = await fetch(`https://ipinfo.io/${userIP}/json?token=${token}`);
        const data = await response.json();

        const tableBody = document.querySelector('#ipTable tbody');
        tableBody.innerHTML = ''; // Limpa a tabela

        // Preenche a tabela com os dados
        for (const key in data) {
            const row = document.createElement('tr');
            const cellKey = document.createElement('td');
            const cellValue = document.createElement('td');

            cellKey.textContent = key;
            cellValue.textContent = data[key];

            row.appendChild(cellKey);
            row.appendChild(cellValue);
            tableBody.appendChild(row);
        }

    } catch (error) {
        console.error('Erro ao buscar informações do IP:', error);
    }
}

// Remova a chamada automática
// fetchIPInfo();
