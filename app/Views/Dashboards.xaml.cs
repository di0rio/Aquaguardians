using System.Collections.ObjectModel;
using System.Windows.Input;

namespace AquaGuardians
{
    public partial class Dashboards : ContentPage
    {
        public ObservableCollection<RobotModel> Robots { get; set; }
        public ICommand DetailCommand { get; private set; }
        public ICommand ControlCommand { get; private set; }
        public ICommand TelemetryCommand { get; private set; }

        public Dashboards()
        {
            InitializeComponent();
            Robots = new ObservableCollection<RobotModel>();
            LoadRobots();
            BindingContext = this;
        }

        private void InitializeCommands()
        {
            DetailCommand = new Command<RobotModel>(async (robot) =>
            {
                await DisplayAlert("Detalhes do Robô",
                    $"ID: {robot.Id}\n" +
                    $"Nome: {robot.Name}\n" +
                    $"Local: {robot.Location}\n" +
                    $"Status: {robot.Status}\n" +
                    $"Bateria: {robot.Battery}%",
                    "OK");
            });

            ControlCommand = new Command<RobotModel>(async (robot) =>
            {
                await DisplayAlert("Controle",
                    $"Controle do robô {robot.Name} em desenvolvimento",
                    "OK");
            });

            TelemetryCommand = new Command<RobotModel>(async (robot) =>
            {
                await DisplayAlert("Telemetria",
                    $"Telemetria do robô {robot.Name} em desenvolvimento",
                    "OK");
            });
        }

        private void LoadRobots()
        {
            // Dados de exemplo - substitua pela sua fonte de dados real
            Robots.Add(new RobotModel
            {
                Id = "ROB001",
                Name = "AquaBot Alpha",
                Status = "Ativo",
                StatusColor = Colors.Green,
                Location = "Lago Norte",
                Battery = 85,
                BatteryColor = Colors.LightGreen,
                LastUpdate = "Há 5 min"
            });

            Robots.Add(new RobotModel
            {
                Id = "ROB002",
                Name = "AquaBot Beta",
                Status = "Em Manutenção",
                StatusColor = Colors.Orange,
                Location = "Lago Sul",
                Battery = 45,
                BatteryColor = Colors.Orange,
                LastUpdate = "Há 30 min"
            });

            Robots.Add(new RobotModel
            {
                Id = "ROB003",
                Name = "AquaBot Gamma",
                Status = "Inativo",
                StatusColor = Colors.Red,
                Location = "Represa Central",
                Battery = 15,
                BatteryColor = Colors.Red,
                LastUpdate = "Há 2h"
            });
        }

        private async void OnHomeClicked(object sender, EventArgs e)
        {
            await Navigation.PopToRootAsync();
        }

        private async void OnUsersClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new PageUsers());
        }
    }

    public class RobotModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public Color StatusColor { get; set; }
        public string Location { get; set; }
        public int Battery { get; set; }
        public Color BatteryColor { get; set; }
        public string LastUpdate { get; set; }
    }
}