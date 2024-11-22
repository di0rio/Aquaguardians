using AquaGuardians;
using AquaGuardians.Views;

namespace AquaGuardians
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            MainPage = new NavigationPage(new LoginPage());

            //COmentario
        }
    }
}
