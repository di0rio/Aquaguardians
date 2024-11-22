using System;
using Microsoft.Maui.Controls;

namespace AquaGuardians.Views
{
    public partial class Cadastro : ContentView
    {
        public Cadastro()
        {
            InitializeComponent();
        }

        private void OnClientesClicked(object sender, EventArgs e)
        {
            // Lógica para o botão "Clientes"
            Console.WriteLine("Botão Clientes clicado");
            // Navegação ou outra funcionalidade pode ser adicionada aqui
        }

        private void OnEmpresasClicked(object sender, EventArgs e)
        {
            // Lógica para o botão "Empresas"
            Console.WriteLine("Botão Empresas clicado");
        }

        private void OnUsuariosClicked(object sender, EventArgs e)
        {
            // Lógica para o botão "Usuários"
            Console.WriteLine("Botão Usuários clicado");
        }

        private void OnRobosClicked(object sender, EventArgs e)
        {
            // Lógica para o botão "Robôs"
            Console.WriteLine("Botão Robôs clicado");
        }

        private void OnFuncionariosClicked(object sender, EventArgs e)
        {
            // Lógica para o botão "Funcionários"
            Console.WriteLine("Botão Funcionários clicado");
        }

        private void OnPostosClicked(object sender, EventArgs e)
        {
            // Lógica para o botão "Postos"
            Console.WriteLine("Botão Postos clicado");
        }
    }
}
