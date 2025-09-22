"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaUser, FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "@/actions/auth";
import { signUpSchema, type SignUpFormData } from "@/lib/schemas";
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

const SignUpPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string>("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
  });

  const {
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const onSubmit = async (data: SignUpFormData) => {
    setServerError("");

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    if (profileImage) {
      formData.append("avatar", profileImage);
    }
    formData.append("password", data.password);
    formData.append("password_confirmation", data.confirmPassword);

    try {
      const result = await signUpAction(formData);

      if (!result.success) {
        Object.entries(result.message).forEach(([key, value]) => {
          setError(key as keyof SignUpFormData, {
            type: "manual",
            message: value[0] as string,
          });
        });
        return;
      }

      localStorage.setItem("token", result.data.token);
      router.push("/");
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Registration</h1>

      {serverError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{serverError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : undefined
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-400 text-2xl" />
                )}
              </div>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="flex items-start gap-2 space-y-2">
              <label
                htmlFor="avatar"
                className="text-orange-500 hover:text-orange-600 cursor-pointer text-sm font-medium"
              >
                Upload new
              </label>
              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            {form.getFieldState("avatar").error && (
              <p className="text-sm text-red-500">
                {form.getFieldState("avatar").error?.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                  {isCheckingUsername && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                  {isCheckingEmail && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </div>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...field}
                      className="pr-12"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
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
            disabled={
              isSubmitting || isPending || isCheckingEmail || isCheckingUsername
            }
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
          >
            {isSubmitting || isPending ? "Creating account..." : "Register"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <span className="text-gray-600">Already member? </span>
        <Link
          href="/sign-in"
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
