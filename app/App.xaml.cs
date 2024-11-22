using AquaGuardians;
using SeuProjeto.Pages;

namespace AquaGuardians
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            MainPage = new NavigationPage(new LoginPage());
        }
    }
}
