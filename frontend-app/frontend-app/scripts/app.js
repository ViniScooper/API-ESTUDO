const apiUrl = 'http://localhost:3000/usuarios';

// Buscar usuários da API e exibir na lista
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        showNotification('Erro ao buscar usuários!', 'error');
        console.error('Error fetching users:', error);
    }
}

let editingUserId = null;

// Exibir usuários na lista
function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (!users.length) {
        userList.innerHTML = `
            <li class="empty-state">
                <i class="fas fa-user-slash"></i>
                <p>Nenhum usuário cadastrado</p>
            </li>
        `;
        return;
    }

    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';
        li.innerHTML = `
            <div class="user-avatar">
                <div class="avatar">${user.name?.charAt(0).toUpperCase() || '?'}</div>
            </div>
            <div class="user-info">
                <h3>${user.name || '(Sem nome)'}</h3>
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <p><i class="fas fa-birthday-cake"></i> ${user.age || '-'} anos</p>
            </div>
            <div class="user-actions">
                <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        userList.appendChild(li);

        // Botão deletar
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', async function() {
            if (confirm('Tem certeza que deseja deletar este usuário?')) {
                try {
                    const response = await fetch(`${apiUrl}/${user.id}`, { method: 'DELETE' });
                    if (response.ok) {
                        fetchUsers();
                        showNotification('Usuário deletado com sucesso!', 'success');
                    } else {
                        showNotification('Erro ao deletar usuário!', 'error');
                    }
                } catch (error) {
                    showNotification('Erro ao deletar usuário!', 'error');
                }
            }
        });

        // Botão editar
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
            onEditUser(user);
        });
    });
}

// Notificação
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

// Submeter formulário
document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    try {
        if (editingUserId) {
            // PUT para atualizar usuário
            const response = await fetch(`${apiUrl}/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, age })
            });
            if (response.ok) {
                showNotification('Usuário atualizado com sucesso!', 'success');
                editingUserId = null;
                document.querySelector('.submit-btn').innerHTML = '<i class="fas fa-save"></i> Cadastrar Usuário';
                document.getElementById('userForm').reset();
                fetchUsers();
            } else {
                showNotification('Erro ao atualizar usuário!', 'error');
            }
        } else {
            // POST para criar usuário
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, age })
            });
            if (response.ok) {
                showNotification('Usuário cadastrado com sucesso!', 'success');
                document.getElementById('userForm').reset();
                fetchUsers();
            } else {
                showNotification('Erro ao cadastrar usuário!', 'error');
            }
        }
    } catch (error) {
        showNotification('Erro ao salvar usuário!', 'error');
    }
});

// Ao clicar em editar, preenche o formulário e muda o botão
function onEditUser(user) {
    document.getElementById('email').value = user.email;
    document.getElementById('name').value = user.name;
    document.getElementById('age').value = user.age;
    editingUserId = user.id;
    document.querySelector('.submit-btn').innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
}

// Botão "Buscar Usuários"
document.getElementById('fetchUsersBtn').addEventListener('click', fetchUsers);

// Busca dinâmica na lista
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const userItems = document.querySelectorAll('.user-item');
    userItems.forEach(item => {
        const userName = item.querySelector('h3').textContent.toLowerCase();
        const userInfoPs = item.querySelectorAll('.user-info p');
        const userEmail = userInfoPs[0]?.textContent.toLowerCase() || '';
        if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Carregar usuários ao abrir a página
document.addEventListener('DOMContentLoaded', fetchUsers);