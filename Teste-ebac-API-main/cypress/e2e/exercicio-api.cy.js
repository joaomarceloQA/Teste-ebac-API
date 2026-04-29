/// <reference types="cypress" />

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve listar usuários cadastrados - GET", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/usuarios",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("usuarios");
    });
  });

  it("Deve cadastrar um usuário com sucesso - POST", () => {
    let email = `marcelo_qa${Math.floor(Math.random() * 100000)}@ebac.com.br`;
    cy.request({
      method: "POST",
      url: "http://localhost:3000/usuarios",
      body: {
        nome: "Marcelo Engenharia de qualidade",
        email: email,
        password: "teste",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
    });
  });

  it("Deve validar um usuário com email inválido - Cenário Negativo", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/usuarios",
      body: {
        nome: "Usuario Errado",
        email: "email_sem_arroba.com",
        password: "teste",
        administrador: "true",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.email).to.equal("email deve ser um email válido");
    });
  });
});
