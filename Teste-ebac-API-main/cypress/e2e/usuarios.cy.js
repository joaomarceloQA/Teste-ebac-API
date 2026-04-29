/// <reference types="cypress" />
import Joi from 'joi'

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

describe('Testes da Funcionalidade Usuários', () => {

    const usuariosSchema = Joi.object({
        quantidade: Joi.number().required(),
        usuarios: Joi.array().items({
            nome: Joi.string().required(),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().required(),
            administrador: Joi.string().required(),
            _id: Joi.string().required()
        })
    })

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(response => {
            expect(response.status).to.equal(200)
            const { error } = usuariosSchema.validate(response.body, { abortEarly: false })
            expect(error).to.be.undefined
        })
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let email = `usuario${Math.floor(Math.random() * 10000)}@teste.com`
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Marcelo Silva",
                "email": email,
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar um usuário com email inválido', () => {
        cy.request({
            method: 'POST',
            url: 'usuarios',
            failOnStatusCode: false,
            body: {
                "nome": "Usuario Errado",
                "email": "email_invalido",
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.email).to.equal('email deve ser um email válido')
        })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let email = `edit${Math.floor(Math.random() * 10000)}@teste.com`
        cy.cadastrarUsuario("Usuario para Editar", email, "teste", "true")
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                        "nome": "Usuario Editado",
                        "email": email,
                        "password": "teste",
                        "administrador": "true"
                    }
                }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        let email = `del${Math.floor(Math.random() * 10000)}@teste.com`
        cy.cadastrarUsuario("Usuario para Deletar", email, "teste", "true")
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
                }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
                })
            })
    });
});