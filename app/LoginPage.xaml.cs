using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            // Validate login credentials
            if (EmailEntry.Text == "adm@gmail.com" && PasswordEntry.Text == "adm123")
            {
                // Navigate to the main app page
                Application.Current.MainPage = new AppShell();
            }
            else
            {
                // Display error message
                await DisplayAlert("Erro", "E-mail ou senha inválidos!", "OK");
            }
        }
    }
}