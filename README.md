# Lojita-Admin
Aplicação web de administração de vendas, produtos e chats de um vendedor em um marketplace.

# CONVENÇÕES DE TESTES

## Idioma
- Mensagens descritivas: Português BR
- Nomes de variáveis/funções: Inglês

## Justificativa
Aplicação web desenvolvida para portfólio e open source visando agregação de conhecimentos.

## Exemplo Padrão
```javascript
describe('Componente de Cadastro', () => {
  it('deve mostrar erro quando email é inválido', () => {
    const userForm = render(<UserForm />);
    //...
  });
});