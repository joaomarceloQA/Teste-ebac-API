Cypress.Commands.add('cadastrarUsuario', (nome, email, senha, admin) => {
    return cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            nome: nome,
            email: email,
            password: senha,
            administrador: admin
        }
    })
})