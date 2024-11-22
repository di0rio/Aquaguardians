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
            // L�gica para o bot�o "Clientes"
            Console.WriteLine("Bot�o Clientes clicado");
            // Navega��o ou outra funcionalidade pode ser adicionada aqui
        }

        private void OnEmpresasClicked(object sender, EventArgs e)
        {
            // L�gica para o bot�o "Empresas"
            Console.WriteLine("Bot�o Empresas clicado");
        }

        private void OnUsuariosClicked(object sender, EventArgs e)
        {
            // L�gica para o bot�o "Usu�rios"
            Console.WriteLine("Bot�o Usu�rios clicado");
        }

        private void OnRobosClicked(object sender, EventArgs e)
        {
            // L�gica para o bot�o "Rob�s"
            Console.WriteLine("Bot�o Rob�s clicado");
        }

        private void OnFuncionariosClicked(object sender, EventArgs e)
        {
            // L�gica para o bot�o "Funcion�rios"
            Console.WriteLine("Bot�o Funcion�rios clicado");
        }

        private void OnPostosClicked(object sender, EventArgs e)
        {
            // L�gica para o bot�o "Postos"
            Console.WriteLine("Bot�o Postos clicado");
        }
    }
}
