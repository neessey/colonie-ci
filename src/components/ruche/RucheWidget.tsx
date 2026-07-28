"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";
import { getRucheProgress } from "@/lib/ruche";

export default function RucheWidget() {
  const { user, profile, logout } = useAuth();

  if (!user || !profile) return null;

  const progress = getRucheProgress(profile.ruche?.ordersCount ?? 0);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-dark-100 text-white rounded-full hover:bg-dark-50 transition-colors">
        <span>{progress.level.icon}</span>
        <span className="text-sm font-medium">
          {progress.filled}/{progress.total}
        </span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-honey/10 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-dark/5">
            <p className="text-sm font-medium text-dark">Bonjour {profile.firstName} 👋</p>
          </div>
          <Menu.Item>
            <Link href="/ma-ruche" className="block px-4 py-3 text-sm text-dark hover:bg-honey/10">
              🐝 Ma Ruche
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/ma-ruche#recompenses" className="block px-4 py-3 text-sm text-dark hover:bg-honey/10">
              🎁 Mes récompenses
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/ma-ruche#historique" className="block px-4 py-3 text-sm text-dark hover:bg-honey/10">
              📦 Historique
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => logout()}
              className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 border-t border-dark/5"
            >
              Se déconnecter
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}