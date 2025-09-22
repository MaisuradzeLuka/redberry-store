export async function getProducts(page: string) {
  try {
    const res = await fetch(
      `${process.env.API_CONNECTION_URL}/products?page=${page}`
    );

    if (!res.ok) {
      return { success: false, message: (await res.json()).errors };
    }

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Sign in error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
