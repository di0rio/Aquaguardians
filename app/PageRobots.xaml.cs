using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.Maui.Controls;

namespace AquaGuardians
{
    public partial class PageRobots : ContentPage
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://aquaguardians.somee.com/api/Robots";
        public ObservableCollection<Robot> Robots { get; set; }
        private Robot _selectedRobot;

        public PageRobots()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            Robots = new ObservableCollection<Robot>();
            RobotsCollectionView.ItemsSource = Robots;
            LoadRobots();
        }

        private async Task LoadRobots()
        {
            try
            {
                var response = await _httpClient.GetAsync(BaseUrl);
                if (response.IsSuccessStatusCode)
                {
                    var robots = await response.Content.ReadFromJsonAsync<List<Robot>>();
                    Robots.Clear();
                    foreach (var robot in robots)
                    {
                        Robots.Add(robot);
                    }
                }
                else
                {
                    await DisplayAlert("Erro", $"Falha ao carregar rob�s. Status: {response.StatusCode}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao carregar rob�s: {ex.Message}", "OK");
            }
        }

        private async void OnCreateRobotClicked(object sender, EventArgs e)
        {
            ModalTitleLabel.Text = "Criar Novo Rob�";
            ClearForm();
            RobotFormModal.IsVisible = true;
        }

        private async void OnEditRobotClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            _selectedRobot = button?.CommandParameter as Robot;

            if (_selectedRobot != null)
            {
                ModalTitleLabel.Text = "Editar Rob�";
                NameEntry.Text = _selectedRobot.Name;
                ModelEntry.Text = _selectedRobot.Model;
                IsAvailableForRentEntry.Text = _selectedRobot.IsAvailableForRent ? "Ativo" : "Inativo";
                RobotStationIdEntry.Text = _selectedRobot.RobotStationId.ToString();
                RobotFormModal.IsVisible = true;
            }
        }

        private async void OnDeleteRobotClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var robot = button?.CommandParameter as Robot;

            if (robot != null)
            {
                bool confirm = await DisplayAlert("Confirmar",
                    "Deseja realmente excluir este rob�?", "Sim", "N�o");

                if (confirm)
                {
                    try
                    {
                        var response = await _httpClient.DeleteAsync($"{BaseUrl}/{robot.RobotId}");
                        if (response.IsSuccessStatusCode)
                        {
                            Robots.Remove(robot);
                            await DisplayAlert("Sucesso", "Rob� exclu�do com sucesso", "OK");
                        }
                        else
                        {
                            await DisplayAlert("Erro", "Falha ao excluir rob�", "OK");
                        }
                    }
                    catch (Exception ex)
                    {
                        await DisplayAlert("Erro", $"Erro ao excluir rob�: {ex.Message}", "OK");
                    }
                }
            }
        }

        private async void OnSaveRobotClicked(object sender, EventArgs e)
        {
            if (!ValidateForm())
            {
                return;
            }

            try
            {
                var robot = new Robot
                {
                    Name = NameEntry.Text,
                    Model = ModelEntry.Text,
                    IsAvailableForRent = IsAvailableForRentEntry.Text.Equals("Sim", StringComparison.OrdinalIgnoreCase),
                    RobotStationId = Guid.Parse(RobotStationIdEntry.Text),
                    CreatedAt = _selectedRobot?.CreatedAt ?? DateTime.Now
                };



                if (_selectedRobot != null)
                {
                    robot.RobotId = _selectedRobot.RobotId;
                    await UpdateRobot(robot);
                }
                else
                {
                    await CreateRobot(robot);
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao salvar rob�: {ex.Message}", "OK");
            }
        }

        private async Task CreateRobot(Robot robot)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync(BaseUrl, robot);
                if (response.IsSuccessStatusCode)
                {
                    await LoadRobots();
                    ClearForm();
                    RobotFormModal.IsVisible = false;
                    await DisplayAlert("Sucesso", "Rob� criado com sucesso", "OK");
                }
                else
                {
                    var errorMessage = await response.Content.ReadAsStringAsync();
                    await DisplayAlert("Erro", $"Falha ao criar rob�. Detalhes: {errorMessage}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro inesperado: {ex.Message}", "OK");
            }
        }


        private async Task UpdateRobot(Robot robot)
        {
            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/{robot.RobotId}", robot);
            if (response.IsSuccessStatusCode)
            {
                await LoadRobots();
                ClearForm();
                RobotFormModal.IsVisible = false;
                await DisplayAlert("Sucesso", "Rob� atualizado com sucesso", "OK");
            }
            else
            {
                await DisplayAlert("Erro", "Falha ao atualizar rob�", "OK");
            }
        }

        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(NameEntry.Text))
            {
                DisplayAlert("Erro", "Nome do rob� � obrigat�rio", "OK");
                return false;
            }

            if (string.IsNullOrWhiteSpace(ModelEntry.Text))
            {
                DisplayAlert("Erro", "Modelo do rob� � obrigat�rio", "OK");
                return false;
            }

            if (string.IsNullOrWhiteSpace(IsAvailableForRentEntry.Text))
            {
                DisplayAlert("Erro", "Status do rob� � obrigat�rio", "OK");
                return false;
            }

            if (!Guid.TryParse(RobotStationIdEntry.Text, out _))
            {
                DisplayAlert("Erro", "ID do posto inv�lido", "OK");
                return false;
            }

            return true;
        }

        private void OnCancelClicked(object sender, EventArgs e)
        {
            ClearForm();
            RobotFormModal.IsVisible = false;
        }

        private void ClearForm()
        {
            _selectedRobot = null;
            NameEntry.Text = string.Empty;
            ModelEntry.Text = string.Empty;
            IsAvailableForRentEntry.Text = string.Empty;
            RobotStationIdEntry.Text = string.Empty;
        }

        private void OnRobotSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            _selectedRobot = e.CurrentSelection.FirstOrDefault() as Robot;
        }
    }

    public class Robot
    {
        public Guid RobotId { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public bool IsAvailableForRent { get; set; }
        public Guid RobotStationId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}