using Microsoft.Maui.Controls;

namespace AquaGuardians.Views
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        private void OnLoginButtonClicked(object sender, EventArgs e)
        {
            // Exemplo de l�gica
            DisplayAlert("Login", "Voc� clicou em login!", "OK");
        }
    }
}
