using System.Collections.ObjectModel;

namespace AquaGuardians
{
    public partial class PageUsers : ContentPage
    {
        public ObservableCollection<UserModel> Users { get; set; }

        public PageUsers()
        {
            InitializeComponent();
            Users = new ObservableCollection<UserModel>();
            LoadUsers();
            BindingContext = this;
        }

        private void LoadUsers()
        {
            // Exemplo de dados - substitua pela sua fonte de dados real
            Users.Add(new UserModel { Id = "001", Info = "Jo�o Silva" });
            Users.Add(new UserModel { Id = "002", Info = "Maria Santos" });
            Users.Add(new UserModel { Id = "003", Info = "Pedro Oliveira" });
            // Adicione mais usu�rios conforme necess�rio
        }

        private async void OnHomeClicked(object sender, EventArgs e)
        {
            await Navigation.PopToRootAsync();
        }

        private async void OnRobotsClicked(object sender, EventArgs e)
        {
                await Navigation.PushAsync(new Dashboards());
        }
    }

    public class UserModel
    {
        public string Id { get; set; }
        public string Info { get; set; }
    }
}