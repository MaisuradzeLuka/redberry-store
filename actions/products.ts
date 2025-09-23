export async function getProducts(
  page: string,
  price_from?: string,
  price_to?: string,
  sort?: string
) {
  try {
    let url = `${process.env.API_CONNECTION_URL}/products?page=${page}`;
    
    if (price_from && price_from !== "0") {
      url += `&filter%5Bprice_from%5D=${price_from}`;
    }
    
    if (price_to && price_to !== "0") {
      url += `&filter%5Bprice_to%5D=${price_to}`;
    }

    if (sort) {
      url += `&sort=${sort}`;
    }

    const res = await fetch(url);

    if (!res.ok) {
      return { success: false, message: (await res.json()).errors };
    }

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Products fetch error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
