export const addToCart = async (
  quantity: number,
  color: string,
  size: string,
  id: string,
  token: string
) => {
  if (!quantity || quantity < 1) {
    return { success: false, message: "Invalid quantity. Please enter a valid amount." };
  }
  
  if (!color || !size) {
    return { success: false, message: "Please select both color and size." };
  }
  
  if (!id) {
    return { success: false, message: "Invalid product ID." };
  }
  
  if (!token) {
    return { success: false, message: "Authentication required. Please sign in." };
  }

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
      let errorMessage = "Failed to add item to cart";
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.errors || errorMessage;
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }

      switch (res.status) {
        case 400:
          errorMessage = "Invalid request. Please check your selection.";
          break;
        case 401:
          errorMessage = "Authentication failed. Please sign in again.";
          break;
        case 403:
          errorMessage = "You don't have permission to perform this action.";
          break;
        case 404:
          errorMessage = "Product not found.";
          break;
        case 409:
          errorMessage = "This item is already in your cart.";
          break;
        case 422:
          errorMessage = "Invalid product selection. Please try again.";
          break;
        case 429:
          errorMessage = "Too many requests. Please wait a moment and try again.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = errorMessage || "Failed to add item to cart";
      }

      return { success: false, message: errorMessage };
    }

    const data = await res.json();
    return { success: true, data: data };
  } catch (error) {
    console.error("Add to cart error:", error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: "Network error. Please check your internet connection and try again.",
      };
    }

    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export const getCartItems = async (token: string) => {
  if (!token) {
    return { success: false, message: "Authentication required. Please sign in." };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_CONNECTION_URL}/cart`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      let errorMessage = "Failed to load cart items";
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.errors || errorMessage;
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }

      switch (res.status) {
        case 401:
          errorMessage = "Authentication failed. Please sign in again.";
          break;
        case 403:
          errorMessage = "You don't have permission to view cart items.";
          break;
        case 404:
          errorMessage = "Cart not found.";
          break;
        case 429:
          errorMessage = "Too many requests. Please wait a moment and try again.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = errorMessage || "Failed to load cart items";
      }

      return { success: false, message: errorMessage };
    }

    const data = await res.json();
    return { success: true, data: data };
  } catch (error) {
    console.error("Get cart items error:", error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: "Network error. Please check your internet connection and try again.",
      };
    }

    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export const deleteCartItem = async (productId: string, token: string) => {
  if (!productId) {
    return { success: false, message: "Invalid product ID." };
  }
  
  if (!token) {
    return { success: false, message: "Authentication required. Please sign in." };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_CONNECTION_URL}/cart/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      let errorMessage = "Failed to remove product from cart";
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.errors || errorMessage;
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }

      switch (res.status) {
        case 400:
          errorMessage = "Invalid request. Please try again.";
          break;
        case 401:
          errorMessage = "Authentication failed. Please sign in again.";
          break;
        case 403:
          errorMessage = "You don't have permission to remove this item.";
          break;
        case 404:
          errorMessage = "Item not found in cart.";
          break;
        case 429:
          errorMessage = "Too many requests. Please wait a moment and try again.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = errorMessage || "Failed to remove product from cart";
      }

      return { success: false, message: errorMessage };
    }

    return { success: true, message: "Product removed from cart" };
  } catch (error) {
    console.error("Delete cart item error:", error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: "Network error. Please check your internet connection and try again.",
      };
    }

    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export const updateCartItemQuantity = async (
  productId: string,
  quantity: number,
  token: string
) => {
  if (!productId) {
    return { success: false, message: "Invalid product ID." };
  }
  
  if (!quantity || quantity < 1) {
    return { success: false, message: "Invalid quantity. Please enter a valid amount." };
  }
  
  if (!token) {
    return { success: false, message: "Authentication required. Please sign in." };
  }

  try {
    const requestBody = {
      quantity,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_CONNECTION_URL}/cart/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.ok) {
      let errorMessage = "Failed to update product quantity";
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.errors || errorMessage;
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }

      switch (res.status) {
        case 400:
          errorMessage = "Invalid request. Please check your quantity.";
          break;
        case 401:
          errorMessage = "Authentication failed. Please sign in again.";
          break;
        case 403:
          errorMessage = "You don't have permission to update this item.";
          break;
        case 404:
          errorMessage = "Item not found in cart.";
          break;
        case 409:
          errorMessage = "Quantity exceeds available stock.";
          break;
        case 422:
          errorMessage = "Invalid quantity. Please enter a valid amount.";
          break;
        case 429:
          errorMessage = "Too many requests. Please wait a moment and try again.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = errorMessage || "Failed to update product quantity";
      }

      return { success: false, message: errorMessage };
    }

    const data = await res.json();
    return { success: true, data: data };
  } catch (error) {
    console.error("Update cart item quantity error:", error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: "Network error. Please check your internet connection and try again.",
      };
    }

    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};