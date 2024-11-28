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
        return;
    }

    private async void OnUsersClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageUsers());
    }

    private async void OnRobotsClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageRobots());
    }

    private async void OnEmpresasClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageFuncionarios());
    }

    private async void OnTransacoesClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageTransacoes());
    }
    private async void OnProdutosClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageProdutos());
    }


    private async void OnMenuClicked(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageMenu());
    }


}