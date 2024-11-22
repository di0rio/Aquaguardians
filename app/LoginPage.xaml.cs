using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent(); // Este método é gerado automaticamente pelo compilador
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            // Exemplo de lógica para validação do login
            bool loginValido = ValidateLogin(); // Substitua com sua lógica real

            if (loginValido)
            {
                // Navegar para a página principal (AppShell ou outra página)
                Application.Current.MainPage = new AppShell();
            }
            else
            {
                // Exibir mensagem de erro
                await DisplayAlert("Erro", "E-mail ou senha inválidos!", "OK");
            }
        }

        private bool ValidateLogin()
        {
            // Exemplo de validação (você pode adicionar lógica real aqui)
            string email = EmailEntry.Text;
            string senha = PasswordEntry.Text;

            // Lógica simples para validar (substitua com sua lógica de autenticação)
            return !string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(senha);
        }
    }
}
