export default async function Home() {
  // TODO: просто написать функцию fetchData
  const res = await fetch(
    'https://maxifoxy-testfront-96b4.twc1.net/api/products',
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const products: any[] = (await res.json()).items;

  return (
    // flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black
    <div>
      {/* flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start */}
      <main>
        {products.map((product, index) => (
          <div key={index}>{product.name}</div>
        ))}
      </main>
    </div>
  );
}
