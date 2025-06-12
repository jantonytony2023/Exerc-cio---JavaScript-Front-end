const token = 'c69a2b4a8bc42e'; 

async function fetchIPInfo() {
    try {
        const ipInput = document.getElementById('ipInput');
        const userIP = ipInput && ipInput.value ? ipInput.value : '';

        if (!userIP) {
            alert('Por favor, digite um IP.');
            return;
        }

        const response = await fetch(`https://ipinfo.io/${userIP}/json?token=${token}`);
        const data = await response.json();

        const tableBody = document.querySelector('#ipTable tbody');

        // Verifica se o IP já está na tabela
        let ipJaExiste = false;
        Array.from(tableBody.querySelectorAll('tr')).forEach(tr => {
            const ipNaTabela = tr.querySelector('td');
            if (ipNaTabela && ipNaTabela.textContent === (data.ip || userIP)) {
                ipJaExiste = true;
            }
        });

        if (ipJaExiste) {
            alert('Este IP já se encontra na tabela.');
            return;
        }

        // Cria uma linha com IP, organização, país e cidade
        const row = document.createElement('tr');

        const ipCell = document.createElement('td');
        ipCell.textContent = data.ip || userIP || 'N/A';

        const orgCell = document.createElement('td');
        if (data.org) {
            // Remove o código AS e pega apenas o nome da organização
            const orgParts = data.org.split(' ');
            orgCell.textContent = orgParts.slice(1).join(' ') || data.org;
        } else {
            orgCell.textContent = 'N/A';
        }

        const countryCell = document.createElement('td');
        countryCell.textContent = data.country || 'N/A';

        const cityCell = document.createElement('td');
        cityCell.textContent = data.city || 'N/A';

        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖'; // Símbolo de X
        deleteBtn.title = 'Excluir';
        deleteBtn.onclick = function() {
            row.remove();
        };
        actionCell.appendChild(deleteBtn);

        row.appendChild(ipCell);
        row.appendChild(orgCell);
        row.appendChild(countryCell);
        row.appendChild(cityCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);

    } catch (error) {
        console.error('Erro ao buscar informações do IP:', error);
    }
}


