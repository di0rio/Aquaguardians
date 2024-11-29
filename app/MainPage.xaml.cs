using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        // Método para animação no botão
        private async void OnCounterClicked(object sender, EventArgs e)
        {
            // Animação de escala no botão
            var button = (Button)sender;
            await AnimateButtonClick(button);

            // Exemplo de navegação para outra página (comentado por enquanto)
            // await Navigation.PushAsync(new MonitoramentoPage());
        }

        // Método de animação para os botões
        private async Task AnimateButtonClick(Button button)
        {
            // Reduz a escala do botão, cria efeito visual de clique e volta ao normal
            await button.ScaleTo(0.95, 100); // 0.95 de escala, duração de 100ms
            await button.ScaleTo(1, 100);     // Retorna para a escala original em 100ms
        }

        // Método para o clique no botão HOME
        private async void OnHomeClicked(object sender, EventArgs e)
        {
            // Exemplo de navegação ou interação que pode ser implementada no futuro
            // Por enquanto, podemos mostrar uma mensagem ou retornar à tela inicial
            await DisplayAlert("Home", "Você está na tela inicial!", "OK");
        }

        // Método para o clique no botão MENU
        private async void OnMenuClicked(object sender, EventArgs e)
        {
            // Exemplo de navegação para a página do menu
            await Navigation.PushAsync(new PageMenu());
        }
    }
}
