"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export const PortfolioForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  
  const [formValues, setFormValues] = useState({
    name: "",
    fiat: 0,
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const uri = "/portfolios/" + user?.email;
  const callbackUrl = searchParams.get("callbackUrl") || uri;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormValues({ name: "", fiat: 0, });

      const res = await fetch("/api/portfolio", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      await router.push(callbackUrl);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex justify-center p-3">
      <form onSubmit={onSubmit}>
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <div>
          <label htmlFor="name">Name *</label>
          <input
            required
            autoFocus
            value={formValues.name}
            onChange={handleChange}
            placeholder="e.g. 'Private Portfolio 001'"
            type="text"
            name="name"
            className="text-black mb-2"
          />
          <label htmlFor="fiat">Fiat</label>
          <input
            autoFocus
            value={formValues.fiat !== null ? formValues.fiat : 0}
            onChange={handleChange}
            placeholder="e.g. '$12,345.67'"
            type="number"
            name="fiat"
            className="text-black mb-2"
          />
          <input
            disabled={!formValues.name}
            type="submit"
            value="Create"
            className="bg-pink-400 mb-2"
          />
        </div>
        <a href="#" onClick={() => router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  );
};