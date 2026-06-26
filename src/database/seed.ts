import { AppDataSource } from './data-source';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import * as bcrypt from 'bcrypt';

const DEFAULT_CATEGORIES = [
  { name: 'Electronics', description: 'Electronic devices and accessories' },
  { name: 'Furniture', description: 'Home and office furniture' },
  { name: 'Accessories', description: 'Bags, watches, and everyday accessories' },
  { name: 'Storage', description: 'SSDs, flash drives, and storage devices' },
];

const SEED_PRODUCTS = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199000.99,
    stock: 25,
    category: 'Electronics',
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness, heart rate, and notifications on the go.',
    price: 249000.99,
    stock: 18,
    category: 'Electronics',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile blue switches.',
    price: 89000.99,
    stock: 30,
    category: 'Electronics',
  },
  {
    name: 'Gaming Mouse',
    description: 'High-precision 16,000 DPI optical sensor with customizable buttons.',
    price: 59000.99,
    stock: 40,
    category: 'Electronics',
  },
  {
    name: 'Portable SSD',
    description: '1TB ultra-fast external storage for your photos and videos.',
    price: 129000,
    stock: 15,
    category: 'Storage',
  },
  {
    name: 'Gamer Bag',
    description: 'Bright orange bag for really cool gamers.',
    price: 75000.25,
    stock: 12,
    category: 'Accessories',
  },
  {
    name: 'Ergonomic Chair',
    description: 'A comfortable chair for long work sessions.',
    price: 200000,
    stock: 8,
    category: 'Furniture',
  },
];

const SEED_USER = {
  firstName: 'Seed',
  lastName: 'Admin',
  email: 'seed@example.com',
  phoneNumber: '08000000000',
  password: 'password123',
};

async function seed() {
  await AppDataSource.initialize();

  const categoryRepo = AppDataSource.getRepository(Category);
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  let categories = await categoryRepo.find();
  if (categories.length === 0) {
    categories = await categoryRepo.save(
      DEFAULT_CATEGORIES.map((category) => categoryRepo.create(category)),
    );
    console.log(`Seeded ${categories.length} categories`);
  } else {
    console.log(`Categories already exist (${categories.length}), skipping`);
  }

  const categoryByName = new Map(categories.map((c) => [c.name!, c]));

  let owner = await userRepo.findOne({ where: { email: SEED_USER.email } });
  if (!owner) {
    owner = await userRepo.save(
      userRepo.create({
        ...SEED_USER,
        password: await bcrypt.hash(SEED_USER.password, 10),
      }),
    );
    console.log(`Seeded owner user: ${owner.email}`);
  } else {
    console.log(`Owner user already exists: ${owner.email}`);
  }

  const existingCount = await productRepo.count();
  if (existingCount > 0) {
    console.log(`Products already exist (${existingCount}), skipping product seed`);
    await AppDataSource.destroy();
    return;
  }

  const products = SEED_PRODUCTS.map((item) => {
    const category = categoryByName.get(item.category);
    if (!category) {
      throw new Error(`Missing category: ${item.category}`);
    }

    return productRepo.create({
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      owner,
      category,
    });
  });

  await productRepo.save(products);
  console.log(`Seeded ${products.length} products`);

  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
