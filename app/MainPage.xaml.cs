using AquaGuardians.Views;

namespace AquaGuardians;

public partial class MainPage : ContentPage
{
    int count = 0;

    public MainPage()
    {
        InitializeComponent();
    }

    private void OnCounterClicked(object sender, EventArgs e)
    {
        count++;
        if (count == 1)
            ((Button)sender).Text = $"Clicked {count} time";
        else
            ((Button)sender).Text = $"Clicked {count} times";

        SemanticScreenReader.Announce(((Button)sender).Text);
    }

    private async void OnHomeClicked(object sender, EventArgs e)
    {
        // Lógica para o botão Home
        Console.WriteLine("Home clicado!");
        return;
    }

    private async void OnDashBoardsClicked(object sender, EventArgs e)
    {
        // Navegação para a página Dashboards
        await Navigation.PushAsync(new Dashboards());
    }

    private async void OnSettingsClicked(object sender, EventArgs e)
    {
        // Lógica para o botão Configurações
        Console.WriteLine("Configurações clicado!");
        await DisplayAlert("Configurações", "Botão Configurações clicado!", "OK");
    }
}
