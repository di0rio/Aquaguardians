using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private async void OnCounterClicked(object sender, EventArgs e)
        {
            // Exemplo de animação no botão
            var button = (Button)sender;
            await button.ScaleTo(0.95, 50);
            await button.ScaleTo(1, 50);

            // Aqui você pode adicionar navegação para página de monitoramento
            // await Navigation.PushAsync(new MonitoramentoPage());
        }

        private async void OnHomeClicked(object sender, EventArgs e)
        {
            return;
        }


        private async void OnMenuClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new PageMenu());
        }
    }
}