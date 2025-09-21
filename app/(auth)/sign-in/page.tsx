"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction } from "@/actions/auth";
import { signInSchema, type SignInFormData } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SignInFormData) => {
    setServerError("");

    startTransition(async () => {
      try {
        const result = await signInAction(data);

        if (result.success) {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          localStorage.setItem("token", result.data.token);
          router.push("/");
        } else {
          setServerError(result.message);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        setServerError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Log in</h1>

      {serverError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{serverError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="pr-12"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
          >
            {isSubmitting || isPending ? "Signing in..." : "Log in"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <span className="text-gray-600">Not a member? </span>
        <Link
          href="/sign-up"
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
