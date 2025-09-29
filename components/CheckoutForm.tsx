"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { checkout } from "@/actions/cart";

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      address: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Please sign in to complete checkout");
        return;
      }

      const result = await checkout(token);
      
      if (result.success) {
        // Store order data in sessionStorage for the result page
        sessionStorage.setItem("orderData", JSON.stringify({
          ...data,
          orderId: result.data?.orderId || Date.now().toString(),
          timestamp: new Date().toISOString()
        }));
        
        // Redirect to checkout result page
        router.push("/checkout-result");
      } else {
        setError(result.message || "Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-[600px]">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter your name"
            className="bg-white"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            id="surname"
            {...register("surname")}
            placeholder="Enter your surname"
            className="bg-white"
          />
          {errors.surname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.surname.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="pl-10 bg-white"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            id="address"
            {...register("address")}
            placeholder="Enter your address"
            className="bg-white"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <Input
            id="zipCode"
            {...register("zipCode")}
            placeholder="Enter zip code"
            className="bg-white"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
