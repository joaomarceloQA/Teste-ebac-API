Cypress.Commands.add('token', (email, senha) => {
    return cy.request({
        method: 'POST',
        url: 'login',
        body: {
            email: email,
            password: senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
})

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

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    return cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { authorization: token },
        body: {
            nome: produto,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade
        },
        failOnStatusCode: false
    })
})