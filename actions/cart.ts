export const addToCart = async (
  quantity: number,
  color: string,
  size: string,
  id: string,
  token: string
) => {
  try {
    const requestBody = {
      quantity,
      color,
      size,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_CONNECTION_URL}/cart/products/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.ok) {
      return { success: false, message: (await res.json()).errors };
    }

    const data = await res.json();

    return { success: true, data: data };
  } catch (error) {
    console.error("Add to cart error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
