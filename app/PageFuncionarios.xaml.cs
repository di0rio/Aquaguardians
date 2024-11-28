using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageFuncionarios : ContentPage
    {
        private readonly HttpClient _httpClient;

        public PageFuncionarios()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            LoadEmployes();
        }

        private async void LoadEmployes()
        {
            try
            {
                string url = "https://aquaguardians.somee.com/api/Employes";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();

                    var employes = JsonSerializer.Deserialize<List<Employe>>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    EmployesCollectionView.ItemsSource = employes; 
                }
                else
                {
                    Console.WriteLine("Erro: Não foi possível carregar os dados.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro: {ex.Message}");
            }
        }
    }

    public class Employe
    {
        public Guid EmployeeId { get; set; }   
        public string Name { get; set; }      
        public string Department { get; set; }    
        public string Position { get; set; }       
        public string Email { get; set; }       
        public string PhoneNumber { get; set; }    
        public string Address { get; set; }       
        public DateTime DateOfBirth { get; set; }  
        public decimal Salary { get; set; }       
        public DateTime HireDate { get; set; }     
    }

}
