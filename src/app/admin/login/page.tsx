"use client";

import { Button } from "@/components/admin/Button";
import { InputField } from "@/components/admin/InputField";
import { useState } from "react";
import * as AdminApi from "@/api/admin";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");

  const handleLoginButton = async () => {
    try {
      if (passwordInput) {
        setWarning("");
        setLoading(true);
        const token = await AdminApi.login(passwordInput);
        setLoading(false);
        if (token) {
          setCookie("token", token);
          router.push("/admin");
        }
      }
    } catch (error: any) {
      setLoading(false);
      setWarning(error.response.data);
    }
  };
  return (
    <div className="text-center py-4">
      <p className="text-lg">What is the secret password?</p>
      <div className="mx-auto max-w-lg">
        <InputField
          type={"password"}
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder={"Text the password"}
          disabled={loading}
        />
        <Button
          value={`${loading ? "Loading..." : "Sign in"}`}
          onClick={handleLoginButton}
          disabled={loading}
        />
        {warning && (
          <div className="border border-dashed border-gray-400 p-3">
            {warning}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
