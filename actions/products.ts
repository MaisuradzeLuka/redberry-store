export async function getProducts() {
  try {
    const res = await fetch(`${process.env.API_CONNECTION_URL}/products`);

    if (!res.ok) {
      return { success: false, message: (await res.json()).errors };
    }

    const data = await res.json();

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Sign in error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
