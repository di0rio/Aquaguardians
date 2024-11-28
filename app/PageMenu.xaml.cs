namespace AquaGuardians;

public partial class PageMenu : ContentPage
{
    public PageMenu()
    {
        InitializeComponent();
    }

    private async void NavigateToPageEmpresas(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageEmpresas());
    }

    private async void NavigateToPageFuncionarios(object sender, EventArgs e)
    {
       // await Navigation.PushAsync(new PageFuncionarios());
    }

    private async void NavigateToPagePostos(object sender, EventArgs e)
    {
      //  await Navigation.PushAsync(new PagePostos());
    }

    private async void NavigateToPageProdutos(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageProdutos());
    }



    private async void NavigateToPageRobots(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageRobots());
    }

    private async void NavigateToPageTransacoes(object sender, EventArgs e)
    {
       await Navigation.PushAsync(new PageTransacoes());
    }

    private async void NavigateToPageUsers(object sender, EventArgs e)
    {
        await Navigation.PushAsync(new PageUsers());
    }
}
