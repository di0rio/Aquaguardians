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
        // Já estamos na página inicial
        return;
    }

    private async void OnUsersClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageUsers());
    }

    private async void OnRobotsClicked(object sender, EventArgs e)
    {
        // Implementar navegação para página de robôs
        //await DisplayAlert("Navegação", "Página de Robôs em desenvolvimento", "OK");
    }
}