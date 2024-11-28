using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;
using System.Text.Json;

namespace AquaGuardians
{
    public partial class PageProdutos : ContentPage
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://aquaguardians.somee.com/api/Products";

        public ObservableCollection<Product> Produtos { get; set; }
        private Product _selectedProduct;

        public PageProdutos()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            Produtos = new ObservableCollection<Product>();
            ProductsCollectionView.ItemsSource = Produtos;
            LoadProducts();
        }

        private async Task LoadProducts()
        {
            try
            {
                var response = await _httpClient.GetAsync(BaseUrl);
                if (response.IsSuccessStatusCode)
                {
                    var products = await response.Content.ReadFromJsonAsync<List<Product>>();
                    Produtos.Clear();
                    foreach (var product in products)
                    {
                        Produtos.Add(product);
                    }
                }
                else
                {
                    await DisplayAlert("Erro", "Não foi possível carregar os produtos", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao carregar produtos: {ex.Message}", "OK");
            }
        }

        private void OnCreateProductClicked(object sender, EventArgs e)
        {
            ModalTitleLabel.Text = "Criar Produto";
            ClearProductForm();
            ProductFormModal.IsVisible = true;
        }

        private void OnEditProductClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            _selectedProduct = button.CommandParameter as Product;

            if (_selectedProduct != null)
            {
                ModalTitleLabel.Text = "Editar Produto";
                NameEntry.Text = _selectedProduct.Name;
                DescriptionEntry.Text = _selectedProduct.Description;
                PriceEntry.Text = _selectedProduct.Price.ToString("F2");
                StockEntry.Text = _selectedProduct.StockQuantity.ToString();
                ProductCategoryIdEntry.Text = _selectedProduct.ProductCategoryId.ToString();

                ProductFormModal.IsVisible = true;
            }
        }

        private async void OnDeleteProductClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var productToDelete = button.CommandParameter as Product;

            if (productToDelete != null)
            {
                try
                {
                    var response = await _httpClient.DeleteAsync($"{BaseUrl}/{productToDelete.ProductId}");
                    if (response.IsSuccessStatusCode)
                    {
                        Produtos.Remove(productToDelete);
                    }
                    else
                    {
                        await DisplayAlert("Erro", "Não foi possível excluir o produto", "OK");
                    }
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Erro", $"Erro ao excluir produto: {ex.Message}", "OK");
                }
            }
        }

        private async void OnSaveProductClicked(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(NameEntry.Text))
            {
                await DisplayAlert("Erro", "Nome do produto é obrigatório", "OK");
                return;
            }

            try
            {
                var product = new Product
                {
                    Name = NameEntry.Text,
                    Description = DescriptionEntry.Text,
                    Price = decimal.Parse(PriceEntry.Text),
                    StockQuantity = int.Parse(StockEntry.Text),
                    ProductCategoryId = Guid.Parse(ProductCategoryIdEntry.Text)
                };

                HttpResponseMessage response;
                if (_selectedProduct == null)
                {
                    // Criar novo produto
                    response = await _httpClient.PostAsJsonAsync(BaseUrl, product);
                }
                else
                {
                    // Editar produto existente
                    product.ProductId = _selectedProduct.ProductId;
                    response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/{product.ProductId}", product);
                }

                if (response.IsSuccessStatusCode)
                {
                    await LoadProducts();
                    ClearProductForm();
                    ProductFormModal.IsVisible = false;
                }
                else
                {
                    await DisplayAlert("Erro", "Não foi possível salvar o produto", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erro", $"Erro ao salvar produto: {ex.Message}", "OK");
            }
        }

        private void OnCancelClicked(object sender, EventArgs e)
        {
            ClearProductForm();
            ProductFormModal.IsVisible = false;
        }

        private void OnProductSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            _selectedProduct = e.CurrentSelection.FirstOrDefault() as Product;
        }

        private void ClearProductForm()
        {
            _selectedProduct = null;
            NameEntry.Text = string.Empty;
            DescriptionEntry.Text = string.Empty;
            PriceEntry.Text = string.Empty;
            StockEntry.Text = string.Empty;
            ProductCategoryIdEntry.Text = string.Empty;
        }
    }

    public class Product
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public Guid ProductCategoryId { get; set; }
    }
}