using AquaGuardians;
using Microsoft.Maui.Controls;

namespace SeuProjeto
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        private void OnLoginClicked(object sender, EventArgs e)
        {
            // Exemplo de lógica para validação do login
            bool loginValido = true; // Substitua com sua lógica real

            if (loginValido)
            {
                // Navegar para a MainPage ou outra página
                Application.Current.MainPage = new AppShell();
            }
            else
            {
                DisplayAlert("Erro", "E-mail ou senha inválidos!", "OK");
            }
        }
    }
}

