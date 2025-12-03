import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
};

type CartItem = Product & { quantity: number };

const Index = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const products: Product[] = [
    { id: 1, name: 'NVIDIA GeForce RTX 4090', brand: 'NVIDIA', price: 189990, oldPrice: 219990, rating: 4.9, reviews: 543, image: '/placeholder.svg', category: 'Видеокарты', inStock: true },
    { id: 2, name: 'AMD Radeon RX 7900 XTX', brand: 'AMD', price: 114990, rating: 4.8, reviews: 387, image: '/placeholder.svg', category: 'Видеокарты', inStock: true },
    { id: 3, name: 'Intel Core i9-14900K', brand: 'Intel', price: 64990, rating: 4.9, reviews: 621, image: '/placeholder.svg', category: 'Процессоры', inStock: true },
    { id: 4, name: 'AMD Ryzen 9 7950X', brand: 'AMD', price: 59990, oldPrice: 69990, rating: 4.8, reviews: 498, image: '/placeholder.svg', category: 'Процессоры', inStock: true },
    { id: 5, name: 'ASUS ROG Strix Z790-E', brand: 'ASUS', price: 44990, rating: 4.7, reviews: 234, image: '/placeholder.svg', category: 'Материнские платы', inStock: true },
    { id: 6, name: 'MSI MAG B650 TOMAHAWK', brand: 'MSI', price: 24990, rating: 4.6, reviews: 312, image: '/placeholder.svg', category: 'Материнские платы', inStock: true },
    { id: 7, name: 'Corsair Vengeance DDR5 64GB', brand: 'Corsair', price: 22990, oldPrice: 27990, rating: 4.8, reviews: 445, image: '/placeholder.svg', category: 'Оперативная память', inStock: true },
    { id: 8, name: 'G.Skill Trident Z5 RGB 32GB', brand: 'G.Skill', price: 14990, rating: 4.7, reviews: 389, image: '/placeholder.svg', category: 'Оперативная память', inStock: true },
    { id: 9, name: 'Samsung 990 PRO 2TB NVMe', brand: 'Samsung', price: 19990, rating: 4.9, reviews: 678, image: '/placeholder.svg', category: 'SSD накопители', inStock: true },
    { id: 10, name: 'WD Black SN850X 1TB', brand: 'Western Digital', price: 11990, oldPrice: 14990, rating: 4.7, reviews: 523, image: '/placeholder.svg', category: 'SSD накопители', inStock: true },
    { id: 11, name: 'Corsair RM1000x 1000W', brand: 'Corsair', price: 18990, rating: 4.8, reviews: 356, image: '/placeholder.svg', category: 'Блоки питания', inStock: true },
    { id: 12, name: 'be quiet! Dark Power 13 850W', brand: 'be quiet!', price: 16990, rating: 4.9, reviews: 289, image: '/placeholder.svg', category: 'Блоки питания', inStock: true },
    { id: 13, name: 'NZXT Kraken X73 RGB', brand: 'NZXT', price: 17990, rating: 4.7, reviews: 412, image: '/placeholder.svg', category: 'Охлаждение', inStock: true },
    { id: 14, name: 'Arctic Liquid Freezer II 360', brand: 'Arctic', price: 12990, oldPrice: 15990, rating: 4.8, reviews: 534, image: '/placeholder.svg', category: 'Охлаждение', inStock: true },
    { id: 15, name: 'Lian Li O11 Dynamic EVO', brand: 'Lian Li', price: 16990, rating: 4.9, reviews: 467, image: '/placeholder.svg', category: 'Корпуса', inStock: true },
    { id: 16, name: 'Fractal Design Torrent', brand: 'Fractal Design', price: 21990, rating: 4.8, reviews: 298, image: '/placeholder.svg', category: 'Корпуса', inStock: true },
    { id: 17, name: 'ASUS TUF Gaming VG27AQ', brand: 'ASUS', price: 34990, oldPrice: 39990, rating: 4.7, reviews: 623, image: '/placeholder.svg', category: 'Мониторы', inStock: true },
    { id: 18, name: 'LG UltraGear 27GP950-B', brand: 'LG', price: 64990, rating: 4.9, reviews: 445, image: '/placeholder.svg', category: 'Мониторы', inStock: true },
    { id: 19, name: 'Logitech G Pro X Superlight', brand: 'Logitech', price: 14990, rating: 4.8, reviews: 789, image: '/placeholder.svg', category: 'Периферия', inStock: true },
    { id: 20, name: 'Razer BlackWidow V4 Pro', brand: 'Razer', price: 24990, rating: 4.7, reviews: 556, image: '/placeholder.svg', category: 'Периферия', inStock: true },
    { id: 21, name: 'Kingston Fury Beast 32GB', brand: 'Kingston', price: 8990, oldPrice: 11990, rating: 4.6, reviews: 421, image: '/placeholder.svg', category: 'Оперативная память', inStock: true },
    { id: 22, name: 'Crucial P5 Plus 1TB', brand: 'Crucial', price: 9990, rating: 4.7, reviews: 367, image: '/placeholder.svg', category: 'SSD накопители', inStock: true },
    { id: 23, name: 'GIGABYTE GeForce RTX 4070 Ti', brand: 'GIGABYTE', price: 89990, rating: 4.8, reviews: 434, image: '/placeholder.svg', category: 'Видеокарты', inStock: true },
    { id: 24, name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', price: 44990, oldPrice: 49990, rating: 4.9, reviews: 712, image: '/placeholder.svg', category: 'Процессоры', inStock: true },
  ];

  const brands = ['NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Corsair', 'G.Skill', 'Samsung', 'Western Digital', 'NZXT', 'Lian Li', 'Logitech', 'Razer', 'Kingston', 'GIGABYTE'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesSearch && matchesPrice && matchesBrand;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4 text-lg">Цена, ₽</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={250000}
          step={1000}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0].toLocaleString()}</span>
          <span>{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4 text-lg">Бренд</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={brand}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain transition-transform group-hover:scale-105"
          />
          {product.oldPrice && (
            <Badge className="absolute top-2 left-2 bg-destructive">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => toggleFavorite(product.id)}
          >
            <Icon
              name="Heart"
              className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}
              size={20}
            />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]">{product.name}</h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Icon name="Star" className="fill-yellow-400 text-yellow-400" size={16} />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-end gap-2">
            <p className="text-2xl font-extrabold">{product.price.toLocaleString()} ₽</p>
            {product.oldPrice && (
              <p className="text-sm text-muted-foreground line-through mb-1">
                {product.oldPrice.toLocaleString()} ₽
              </p>
            )}
          </div>

          <Button
            className="w-full"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            {product.inStock ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Icon name="Menu" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TechStore
              </h1>

              <nav className="hidden lg:flex items-center gap-1">
                {[
                  { id: 'home', label: 'Главная', icon: 'Home' },
                  { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
                  { id: 'delivery', label: 'Доставка', icon: 'Truck' },
                  { id: 'contacts', label: 'Контакты', icon: 'Phone' },
                ].map(item => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    onClick={() => setActiveTab(item.id)}
                    className="gap-2"
                  >
                    <Icon name={item.icon as any} size={18} />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Поиск товаров..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab('favorites')}
                className="relative"
              >
                <Icon name="Heart" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab('cart')}
                className="relative"
              >
                <Icon name="ShoppingCart" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab('profile')}
              >
                <Icon name="User" />
              </Button>
            </div>
          </div>

          <div className="md:hidden pb-3">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск товаров..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="hidden lg:block">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <FilterSidebar />
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Каталог товаров</h2>
                <p className="text-muted-foreground">{filteredProducts.length} товаров</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Корзина</h2>

            {cart.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                  <p className="text-muted-foreground mb-4">Добавьте товары из каталога</p>
                  <Button onClick={() => setActiveTab('catalog')}>
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                            <p className="text-lg font-bold">{item.price.toLocaleString()} ₽</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="lg:sticky lg:top-24 h-fit">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Итого</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Товары ({cartCount})</span>
                        <span className="font-semibold">{cartTotal.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Доставка</span>
                        <span className="font-semibold">Бесплатно</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-bold">Итого</span>
                      <span className="text-2xl font-bold">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Избранное</h2>

            {favorites.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon name="Heart" size={64} className="text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Избранное пусто</h3>
                  <p className="text-muted-foreground mb-4">Добавьте товары в избранное</p>
                  <Button onClick={() => setActiveTab('catalog')}>
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                  .filter(p => favorites.includes(p.id))
                  .map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Личный кабинет</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={40} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Иван Иванов</h3>
                    <p className="text-muted-foreground">ivan@example.com</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Package" className="mr-2" />
                    Мои заказы
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MapPin" className="mr-2" />
                    Адреса доставки
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="CreditCard" className="mr-2" />
                    Способы оплаты
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" className="mr-2" />
                    Настройки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Доставка и оплата</h2>
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Truck" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
                      <p className="text-muted-foreground">
                        Доставим ваш заказ в течение 1-3 дней по Москве и Московской области. 
                        Бесплатная доставка при заказе от 5000 ₽.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="CreditCard" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Удобная оплата</h3>
                      <p className="text-muted-foreground">
                        Оплата картой онлайн, наличными или картой курьеру. 
                        Безопасные платежи через защищенное соединение.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Shield" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
                      <p className="text-muted-foreground">
                        Все товары сертифицированы и имеют официальную гарантию производителя. 
                        Возврат и обмен в течение 14 дней.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Свяжитесь с нами</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" className="text-primary" />
                      <div>
                        <p className="font-semibold">+7 (495) 123-45-67</p>
                        <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" className="text-primary" />
                      <div>
                        <p className="font-semibold">info@techstore.ru</p>
                        <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" className="text-primary" />
                      <div>
                        <p className="font-semibold">г. Москва, ул. Примерная, д. 123</p>
                        <p className="text-sm text-muted-foreground">Пн-Вс: 10:00 - 22:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Написать нам</h3>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input type="email" placeholder="Email" />
                    <Input placeholder="Тема" />
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background resize-none"
                      placeholder="Ваше сообщение"
                    />
                    <Button className="w-full">Отправить</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-12 text-white">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">Добро пожаловать в TechStore</h2>
                <p className="text-xl mb-6 opacity-90">
                  Лучшая электроника по выгодным ценам. Быстрая доставка и гарантия качества.
                </p>
                <Button size="lg" variant="secondary" onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Популярные товары</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
                  <p className="text-muted-foreground">Доставка за 1-3 дня по Москве</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
                  <p className="text-muted-foreground">Официальная гарантия на все товары</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Headphones" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Поддержка 24/7</h3>
                  <p className="text-muted-foreground">Всегда готовы помочь</p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}
      </main>

      <footer className="border-t mt-12 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3">О компании</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition">Вакансии</a></li>
                <li><a href="#" className="hover:text-foreground transition">Партнёрам</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Доставка</a></li>
                <li><a href="#" className="hover:text-foreground transition">Оплата</a></li>
                <li><a href="#" className="hover:text-foreground transition">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@techstore.ru</li>
                <li>г. Москва</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Социальные сети</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 TechStore. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;